import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { 
  CreateStopInput, 
  UpdateStopInput,
  ReorderStopsInput,
  AssignStudentsInput
} from '../schemas/route';

// Stop Management
export const getRouteStops = async (req: AuthRequest, res: Response) => {
  const { routeId } = req.params;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to this route');
    error.statusCode = 403;
    throw error;
  }

  const stops = await prisma.stop.findMany({
    where: { 
      routeId,
      isActive: true,
    },
    orderBy: { stopOrder: 'asc' },
    include: {
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, grade: true },
          },
        },
      },
      _count: {
        select: {
          assignments: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: { items: stops },
  });
};

export const createStop = async (req: AuthRequest, res: Response) => {
  const { name, address, routeId, stopOrder, estimatedArrival, latitude, longitude, isActive }: CreateStopInput = req.body;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this route');
    error.statusCode = 403;
    throw error;
  }

  // Check if stop order already exists
  const existingStop = await prisma.stop.findFirst({
    where: {
      routeId,
      stopOrder,
      isActive: true,
    },
  });

  if (existingStop) {
    // Auto-increment stop orders if needed
    await prisma.stop.updateMany({
      where: {
        routeId,
        stopOrder: { gte: stopOrder },
        isActive: true,
      },
      data: {
        stopOrder: { increment: 1 },
      },
    });
  }

  const stop = await prisma.stop.create({
    data: {
      name,
      address,
      routeId,
      stopOrder,
      estimatedArrival,
      latitude,
      longitude,
      isActive: isActive ?? true,
    },
    include: {
      route: {
        select: { id: true, routeName: true },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, grade: true },
          },
        },
      },
      _count: {
        select: {
          assignments: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: { stop },
  });
};

export const updateStop = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateStopInput = req.body;

  const existingStop = await prisma.stop.findUnique({
    where: { id },
    include: {
      route: true,
    },
  });

  if (!existingStop) {
    const error: AppError = new Error('Stop not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && existingStop.route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this stop');
    error.statusCode = 403;
    throw error;
  }

  // Handle stop order changes
  if (updateData.stopOrder && updateData.stopOrder !== existingStop.stopOrder) {
    const routeId = existingStop.routeId;
    const oldOrder = existingStop.stopOrder;
    const newOrder = updateData.stopOrder;

    // Update other stops' orders
    if (newOrder > oldOrder) {
      // Moving down - shift stops up
      await prisma.stop.updateMany({
        where: {
          routeId,
          stopOrder: { gt: oldOrder, lte: newOrder },
          isActive: true,
        },
        data: {
          stopOrder: { decrement: 1 },
        },
      });
    } else {
      // Moving up - shift stops down
      await prisma.stop.updateMany({
        where: {
          routeId,
          stopOrder: { gte: newOrder, lt: oldOrder },
          isActive: true,
        },
        data: {
          stopOrder: { increment: 1 },
        },
      });
    }
  }

  const stop = await prisma.stop.update({
    where: { id },
    data: updateData,
    include: {
      route: {
        select: { id: true, routeName: true },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, grade: true },
          },
        },
      },
      _count: {
        select: {
          assignments: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: { stop },
  });
};

export const deleteStop = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingStop = await prisma.stop.findUnique({
    where: { id },
    include: {
      route: true,
      _count: {
        select: {
          assignments: true,
        },
      },
    },
  });

  if (!existingStop) {
    const error: AppError = new Error('Stop not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && existingStop.route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to delete this stop');
    error.statusCode = 403;
    throw error;
  }

  if (existingStop._count.assignments > 0) {
    // Soft delete - mark as inactive
    await prisma.stop.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Stop deactivated successfully (has assigned students)',
    });
  } else {
    // Hard delete and reorder remaining stops
    const routeId = existingStop.routeId;
    const deletedOrder = existingStop.stopOrder;

    await prisma.$transaction([
      // Delete the stop
      prisma.stop.delete({ where: { id } }),
      // Reorder remaining stops
      prisma.stop.updateMany({
        where: {
          routeId,
          stopOrder: { gt: deletedOrder },
          isActive: true,
        },
        data: {
          stopOrder: { decrement: 1 },
        },
      }),
    ]);

    res.json({
      success: true,
      message: 'Stop deleted successfully',
    });
  }
};

export const reorderStops = async (req: AuthRequest, res: Response) => {
  const { routeId } = req.params;
  const { stopOrders }: ReorderStopsInput = req.body;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this route');
    error.statusCode = 403;
    throw error;
  }

  // Verify all stops belong to this route
  const stops = await prisma.stop.findMany({
    where: {
      id: { in: stopOrders.map(so => so.stopId) },
      routeId,
    },
  });

  if (stops.length !== stopOrders.length) {
    const error: AppError = new Error('One or more stops not found in this route');
    error.statusCode = 400;
    throw error;
  }

  // Update stop orders in a transaction
  await prisma.$transaction(
    stopOrders.map(({ stopId, order }) =>
      prisma.stop.update({
        where: { id: stopId },
        data: { stopOrder: order },
      })
    )
  );

  res.json({
    success: true,
    message: 'Stops reordered successfully',
  });
};

// Student Assignment Management
export const getRouteAssignments = async (req: AuthRequest, res: Response) => {
  const { routeId } = req.params;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to this route');
    error.statusCode = 403;
    throw error;
  }

  const assignments = await prisma.assignment.findMany({
    where: { 
      routeId,
      isActive: true,
    },
    include: {
      student: {
        select: { 
          id: true, 
          studentId: true,
          firstName: true, 
          lastName: true, 
          grade: true,
          address: true,
        },
      },
      stop: {
        select: { id: true, name: true, address: true, stopOrder: true },
      },
      route: {
        select: { id: true, routeName: true },
      },
    },
    orderBy: {
      stop: { stopOrder: 'asc' },
    },
  });

  res.json({
    success: true,
    data: { items: assignments },
  });
};

export const assignStudentsToRoute = async (req: AuthRequest, res: Response) => {
  const { routeId } = req.params;
  const { assignments }: AssignStudentsInput = req.body;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this route');
    error.statusCode = 403;
    throw error;
  }

  // Verify all students and stops exist and belong to the same school
  const studentIds = assignments.map(a => a.studentId);
  const stopIds = assignments.map(a => a.stopId);

  const [students, stops] = await Promise.all([
    prisma.student.findMany({
      where: { 
        id: { in: studentIds },
        schoolId: route.schoolId,
        isActive: true,
      },
    }),
    prisma.stop.findMany({
      where: {
        id: { in: stopIds },
        routeId,
        isActive: true,
      },
    }),
  ]);

  if (students.length !== studentIds.length) {
    const error: AppError = new Error('One or more students not found in this school');
    error.statusCode = 400;
    throw error;
  }

  if (stops.length !== stopIds.length) {
    const error: AppError = new Error('One or more stops not found in this route');
    error.statusCode = 400;
    throw error;
  }

  // Create assignments
  const newAssignments = await prisma.$transaction(
    assignments.map(({ studentId, stopId }) =>
      prisma.assignment.upsert({
        where: {
          studentId_routeId: {
            studentId,
            routeId,
          },
        },
        update: {
          stopId,
          isActive: true,
          status: 'ASSIGNED',
        },
        create: {
          studentId,
          routeId,
          stopId,
          status: 'ASSIGNED',
        },
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, grade: true },
          },
          stop: {
            select: { id: true, name: true },
          },
        },
      })
    )
  );

  res.status(201).json({
    success: true,
    data: { assignments: newAssignments },
    message: 'Students assigned to route successfully',
  });
};

export const removeStudentFromRoute = async (req: AuthRequest, res: Response) => {
  const { routeId, studentId } = req.params;

  // Verify route exists and user has permission
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && route.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this route');
    error.statusCode = 403;
    throw error;
  }

  // Find and remove/deactivate assignment
  const assignment = await prisma.assignment.findFirst({
    where: {
      studentId,
      routeId,
      isActive: true,
    },
  });

  if (!assignment) {
    const error: AppError = new Error('Student assignment not found');
    error.statusCode = 404;
    throw error;
  }

  await prisma.assignment.update({
    where: { id: assignment.id },
    data: { 
      isActive: false,
      status: 'CANCELLED',
    },
  });

  res.json({
    success: true,
    message: 'Student removed from route successfully',
  });
};