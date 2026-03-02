import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { CreateVehicleInput, UpdateVehicleInput } from '../schemas/vehicle';

export const createVehicle = async (req: AuthRequest, res: Response) => {
  const { licensePlate, model, capacity, year, schoolId }: CreateVehicleInput = req.body;

  const school = await prisma.school.findUnique({
    where: { id: schoolId },
  });

  if (!school) {
    const error: AppError = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      licensePlate,
      model,
      capacity,
      year: year || null,
      schoolId,
    },
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: { vehicle },
  });
};

export const getVehicles = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, schoolId, search } = req.query;
  
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: any = { isActive: true };
  
  if (schoolId && typeof schoolId === 'string') {
    where.schoolId = schoolId;
  }
  
  if (search && typeof search === 'string') {
    where.OR = [
      { licensePlate: { contains: search, mode: 'insensitive' } },
      { model: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      skip,
      take,
      include: {
        school: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            assignments: true,
            trips: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.vehicle.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items: vehicles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    },
  });
};

export const getVehicleById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      assignments: {
        where: { isActive: true },
        include: {
          driver: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  phone: true,
                },
              },
            },
          },
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              grade: true,
            },
          },
        },
      },
      trips: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        include: {
          driver: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          route: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!vehicle) {
    const error: AppError = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  res.json({
    success: true,
    data: { vehicle },
  });
};

export const updateVehicle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateVehicleInput = req.body;

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!existingVehicle) {
    const error: AppError = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  if (updateData.schoolId) {
    const school = await prisma.school.findUnique({
      where: { id: updateData.schoolId },
    });

    if (!school) {
      const error: AppError = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }
  }

  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: updateData,
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: { vehicle },
  });
};

export const deleteVehicle = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          assignments: true,
          trips: true,
        },
      },
    },
  });

  if (!existingVehicle) {
    const error: AppError = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  const hasActiveData = 
    existingVehicle._count.assignments > 0 ||
    existingVehicle._count.trips > 0;

  if (hasActiveData) {
    await prisma.vehicle.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Vehicle deactivated successfully (has associated data)',
    });
  } else {
    await prisma.vehicle.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  }
};