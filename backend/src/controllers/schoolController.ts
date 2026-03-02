import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { CreateSchoolInput, UpdateSchoolInput } from '../schemas/school';

export const createSchool = async (req: AuthRequest, res: Response) => {
  const { name, address, phone, email }: CreateSchoolInput = req.body;

  const school = await prisma.school.create({
    data: {
      name,
      address,
      phone,
      email: email || null,
    },
  });

  res.status(201).json({
    success: true,
    data: { school },
  });
};

export const getSchools = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;
  
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: any = { isActive: true };
  
  if (search && typeof search === 'string') {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [schools, total] = await Promise.all([
    prisma.school.findMany({
      where,
      skip,
      take,
      include: {
        _count: {
          select: {
            vehicles: true,
            drivers: true,
            students: true,
            routes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.school.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      items: schools,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    },
  });
};

export const getSchoolById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const school = await prisma.school.findUnique({
    where: { id },
    include: {
      vehicles: {
        where: { isActive: true },
        select: {
          id: true,
          licensePlate: true,
          model: true,
          capacity: true,
          year: true,
        },
      },
      drivers: {
        where: { isActive: true },
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
      students: {
        where: { isActive: true },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          grade: true,
        },
      },
      routes: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      _count: {
        select: {
          vehicles: true,
          drivers: true,
          students: true,
          routes: true,
        },
      },
    },
  });

  if (!school) {
    const error: AppError = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  res.json({
    success: true,
    data: { school },
  });
};

export const updateSchool = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateSchoolInput = req.body;

  const existingSchool = await prisma.school.findUnique({
    where: { id },
  });

  if (!existingSchool) {
    const error: AppError = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  const school = await prisma.school.update({
    where: { id },
    data: updateData,
  });

  res.json({
    success: true,
    data: { school },
  });
};

export const deleteSchool = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingSchool = await prisma.school.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          vehicles: true,
          drivers: true,
          students: true,
          routes: true,
        },
      },
    },
  });

  if (!existingSchool) {
    const error: AppError = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  const hasActiveData = 
    existingSchool._count.vehicles > 0 ||
    existingSchool._count.drivers > 0 ||
    existingSchool._count.students > 0 ||
    existingSchool._count.routes > 0;

  if (hasActiveData) {
    await prisma.school.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'School deactivated successfully (has associated data)',
    });
  } else {
    await prisma.school.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'School deleted successfully',
    });
  }
};