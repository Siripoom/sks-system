import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { 
  CreateRouteInput, 
  UpdateRouteInput,
  BulkUpdateRoutesInput,
  DuplicateRouteInput,
  RouteFiltersInput
} from '../schemas/route';

// Route CRUD Operations
export const createRoute = async (req: AuthRequest, res: Response) => {
  const { routeName, description, schoolId, distance, estimatedDuration, isActive }: CreateRouteInput = req.body;

  // Check if school exists
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
  });

  if (!school) {
    const error: AppError = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if route name already exists in this school
  const existingRoute = await prisma.route.findFirst({
    where: {
      routeName,
      schoolId,
      isActive: true,
    },
  });

  if (existingRoute) {
    const error: AppError = new Error('Route name already exists in this school');
    error.statusCode = 409;
    throw error;
  }

  const route = await prisma.route.create({
    data: {
      routeName,
      description,
      schoolId,
      distance,
      estimatedDuration,
      isActive: isActive ?? true,
    },
    include: {
      school: {
        select: { id: true, name: true },
      },
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true },
          },
          stop: {
            select: { id: true, name: true },
          },
        },
      },
      _count: {
        select: {
          stops: true,
          assignments: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: { route },
  });
};

export const getRoutes = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, search, schoolId, isActive }: RouteFiltersInput = req.query as any;
  
  const skip = (page - 1) * limit;
  const take = limit;

  const where: any = {};
  
  // Add school filter if user is not admin
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER') {
    where.schoolId = req.user?.schoolId || '';
  } else if (schoolId) {
    where.schoolId = schoolId;
  }

  if (search) {
    where.OR = [
      { routeName: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { school: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  const [routes, total] = await Promise.all([
    prisma.route.findMany({
      where,
      skip,
      take,
      include: {
        school: {
          select: { id: true, name: true },
        },
        stops: {
          orderBy: { stopOrder: 'asc' },
          select: { id: true, name: true, estimatedArrival: true },
        },
        assignments: {
          include: {
            student: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        _count: {
          select: {
            stops: true,
            assignments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.route.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items: routes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
};

export const getRouteById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const route = await prisma.route.findUnique({
    where: { id },
    include: {
      school: {
        select: { id: true, name: true, address: true },
      },
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true, grade: true },
          },
          stop: {
            select: { id: true, name: true },
          },
        },
      },
      trips: {
        select: { id: true, status: true, scheduledAt: true },
        orderBy: { scheduledAt: 'desc' },
        take: 5,
      },
      _count: {
        select: {
          stops: true,
          assignments: true,
          trips: true,
        },
      },
    },
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

  res.json({
    success: true,
    data: { route },
  });
};

export const updateRoute = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateRouteInput = req.body;

  const existingRoute = await prisma.route.findUnique({
    where: { id },
    include: { school: true },
  });

  if (!existingRoute) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && existingRoute.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to update this route');
    error.statusCode = 403;
    throw error;
  }

  // Check if new route name already exists in the same school
  if (updateData.routeName && updateData.routeName !== existingRoute.routeName) {
    const duplicateRoute = await prisma.route.findFirst({
      where: {
        routeName: updateData.routeName,
        schoolId: updateData.schoolId || existingRoute.schoolId,
        isActive: true,
        id: { not: id },
      },
    });

    if (duplicateRoute) {
      const error: AppError = new Error('Route name already exists in this school');
      error.statusCode = 409;
      throw error;
    }
  }

  // Verify new school exists if schoolId is being updated
  if (updateData.schoolId && updateData.schoolId !== existingRoute.schoolId) {
    const school = await prisma.school.findUnique({
      where: { id: updateData.schoolId },
    });

    if (!school) {
      const error: AppError = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }
  }

  const route = await prisma.route.update({
    where: { id },
    data: updateData,
    include: {
      school: {
        select: { id: true, name: true },
      },
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true },
          },
          stop: {
            select: { id: true, name: true },
          },
        },
      },
      _count: {
        select: {
          stops: true,
          assignments: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: { route },
  });
};

export const deleteRoute = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingRoute = await prisma.route.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          stops: true,
          assignments: true,
          trips: true,
        },
      },
    },
  });

  if (!existingRoute) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && existingRoute.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to delete this route');
    error.statusCode = 403;
    throw error;
  }

  const hasActiveData = 
    existingRoute._count.stops > 0 ||
    existingRoute._count.assignments > 0 ||
    existingRoute._count.trips > 0;

  if (hasActiveData) {
    // Soft delete - mark as inactive
    await prisma.route.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Route deactivated successfully (has associated data)',
    });
  } else {
    // Hard delete if no associated data
    await prisma.route.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Route deleted successfully',
    });
  }
};

export const toggleRouteStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingRoute = await prisma.route.findUnique({
    where: { id },
  });

  if (!existingRoute) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && existingRoute.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to modify this route');
    error.statusCode = 403;
    throw error;
  }

  const route = await prisma.route.update({
    where: { id },
    data: { isActive: !existingRoute.isActive },
    include: {
      school: {
        select: { id: true, name: true },
      },
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
      assignments: {
        include: {
          student: {
            select: { id: true, firstName: true, lastName: true },
          },
          stop: {
            select: { id: true, name: true },
          },
        },
      },
      _count: {
        select: {
          stops: true,
          assignments: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: { route },
  });
};

// Bulk Operations
export const bulkUpdateRoutes = async (req: AuthRequest, res: Response) => {
  const { routeIds, updates }: BulkUpdateRoutesInput = req.body;

  // Verify all routes exist and user has permission
  const routes = await prisma.route.findMany({
    where: { 
      id: { in: routeIds },
    },
  });

  if (routes.length !== routeIds.length) {
    const error: AppError = new Error('One or more routes not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions for each route
  const unauthorizedRoutes = routes.filter(route => 
    req.user?.role !== 'ADMIN' && 
    req.user?.role !== 'TEACHER' && 
    route.schoolId !== req.user?.schoolId
  );

  if (unauthorizedRoutes.length > 0) {
    const error: AppError = new Error('Access denied to some routes');
    error.statusCode = 403;
    throw error;
  }

  await prisma.route.updateMany({
    where: { 
      id: { in: routeIds },
    },
    data: updates,
  });

  res.json({
    success: true,
    message: `Updated ${routeIds.length} routes successfully`,
  });
};

export const duplicateRoute = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { routeName }: DuplicateRouteInput = req.body;

  const originalRoute = await prisma.route.findUnique({
    where: { id },
    include: {
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
    },
  });

  if (!originalRoute) {
    const error: AppError = new Error('Route not found');
    error.statusCode = 404;
    throw error;
  }

  // Check permissions
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'TEACHER' && originalRoute.schoolId !== req.user?.schoolId) {
    const error: AppError = new Error('Access denied to duplicate this route');
    error.statusCode = 403;
    throw error;
  }

  // Check if new route name already exists
  const existingRoute = await prisma.route.findFirst({
    where: {
      routeName,
      schoolId: originalRoute.schoolId,
      isActive: true,
    },
  });

  if (existingRoute) {
    const error: AppError = new Error('Route name already exists in this school');
    error.statusCode = 409;
    throw error;
  }

  // Create new route with stops
  const newRoute = await prisma.$transaction(async (tx) => {
    const route = await tx.route.create({
      data: {
        routeName,
        description: originalRoute.description ? `${originalRoute.description} (Copy)` : null,
        schoolId: originalRoute.schoolId,
        distance: originalRoute.distance,
        estimatedDuration: originalRoute.estimatedDuration,
        isActive: true,
      },
    });

    // Copy stops
    if (originalRoute.stops.length > 0) {
      await tx.stop.createMany({
        data: originalRoute.stops.map(stop => ({
          name: stop.name,
          address: stop.address,
          latitude: stop.latitude,
          longitude: stop.longitude,
          stopOrder: stop.stopOrder,
          estimatedArrival: stop.estimatedArrival,
          routeId: route.id,
        })),
      });
    }

    return route;
  });

  const fullRoute = await prisma.route.findUnique({
    where: { id: newRoute.id },
    include: {
      school: {
        select: { id: true, name: true },
      },
      stops: {
        orderBy: { stopOrder: 'asc' },
      },
      _count: {
        select: {
          stops: true,
          assignments: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: { route: fullRoute },
  });
};