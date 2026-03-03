import { Response } from "express";
import { prisma } from "../index";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";

export const getStudents = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, search, grade, schoolId } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: any = {};

  if (search && typeof search === "string") {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { studentId: { contains: search, mode: "insensitive" } },
    ];
  }

  if (grade && typeof grade === "string") {
    where.grade = grade;
  }

  if (schoolId && typeof schoolId === "string") {
    where.schoolId = schoolId;
  }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
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
        guardians: {
          include: {
            guardian: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                relationship: true,
                phone: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.student.count({ where }),
  ]);

  // Transform the data to match frontend expectations
  const transformedStudents = students.map(student => ({
    ...student,
    guardianIds: student.guardians.map(sg => sg.guardianId),
    guardians: student.guardians.map(sg => sg.guardian),
  }));

  res.json({
    success: true,
    data: {
      items: transformedStudents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    },
  });
};

export const getStudentById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
      guardians: {
        include: {
          guardian: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              relationship: true,
              phone: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!student) {
    const error: AppError = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Transform the data to match frontend expectations
  const transformedStudent = {
    ...student,
    guardianIds: student.guardians.map(sg => sg.guardianId),
    guardians: student.guardians.map(sg => sg.guardian),
  };

  res.json({
    success: true,
    data: { student: transformedStudent },
  });
};

export const createStudent = async (req: AuthRequest, res: Response) => {
  const {
    studentId,
    firstName,
    lastName,
    grade,
    dateOfBirth,
    schoolId,
    guardianIds = [],
    address,
    pickupAddress,
    dropoffAddress,
    medicalInfo,
    specialNeeds,
    emergencyContact,
  } = req.body;

  // Check if student ID is unique
  const existingStudent = await prisma.student.findUnique({
    where: { studentId },
  });

  if (existingStudent) {
    const error: AppError = new Error("Student ID already exists");
    error.statusCode = 409;
    throw error;
  }

  // Verify school exists
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
  });

  if (!school) {
    const error: AppError = new Error("School not found");
    error.statusCode = 404;
    throw error;
  }

  // Verify all guardians exist
  if (guardianIds.length > 0) {
    const guardians = await prisma.guardian.findMany({
      where: { id: { in: guardianIds } },
    });

    if (guardians.length !== guardianIds.length) {
      const error: AppError = new Error("One or more guardians not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Create student with guardian relationships
  const student = await prisma.student.create({
    data: {
      studentId,
      firstName,
      lastName,
      grade,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      schoolId,
      address,
      pickupAddress,
      dropoffAddress,
      medicalInfo,
      specialNeeds,
      emergencyContact,
      guardians: {
        create: guardianIds.map((guardianId: string) => ({
          guardianId,
        })),
      },
    },
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
      guardians: {
        include: {
          guardian: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              relationship: true,
              phone: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // Transform the data to match frontend expectations
  const transformedStudent = {
    ...student,
    guardianIds: student.guardians.map(sg => sg.guardianId),
    guardians: student.guardians.map(sg => sg.guardian),
  };

  res.status(201).json({
    success: true,
    data: { student: transformedStudent },
  });
};

export const updateStudent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const {
    studentId,
    firstName,
    lastName,
    grade,
    dateOfBirth,
    schoolId,
    guardianIds,
    address,
    pickupAddress,
    dropoffAddress,
    medicalInfo,
    specialNeeds,
    emergencyContact,
    isActive,
  } = req.body;

  const existingStudent = await prisma.student.findUnique({
    where: { id },
  });

  if (!existingStudent) {
    const error: AppError = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if studentId is unique (if being updated)
  if (studentId && studentId !== existingStudent.studentId) {
    const duplicateStudent = await prisma.student.findUnique({
      where: { studentId },
    });

    if (duplicateStudent) {
      const error: AppError = new Error("Student ID already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  // Verify school exists (if being updated)
  if (schoolId && schoolId !== existingStudent.schoolId) {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!school) {
      const error: AppError = new Error("School not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Verify all guardians exist (if being updated)
  if (guardianIds) {
    const guardians = await prisma.guardian.findMany({
      where: { id: { in: guardianIds } },
    });

    if (guardians.length !== guardianIds.length) {
      const error: AppError = new Error("One or more guardians not found");
      error.statusCode = 404;
      throw error;
    }
  }

  const updateData: any = {};
  if (studentId !== undefined) updateData.studentId = studentId;
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (grade !== undefined) updateData.grade = grade;
  if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
  if (schoolId !== undefined) updateData.schoolId = schoolId;
  if (address !== undefined) updateData.address = address;
  if (pickupAddress !== undefined) updateData.pickupAddress = pickupAddress;
  if (dropoffAddress !== undefined) updateData.dropoffAddress = dropoffAddress;
  if (medicalInfo !== undefined) updateData.medicalInfo = medicalInfo;
  if (specialNeeds !== undefined) updateData.specialNeeds = specialNeeds;
  if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
  if (isActive !== undefined) updateData.isActive = isActive;

  // Update guardian relationships if provided
  if (guardianIds) {
    // Delete existing relationships and create new ones
    await prisma.studentGuardian.deleteMany({
      where: { studentId: id },
    });

    updateData.guardians = {
      create: guardianIds.map((guardianId: string) => ({
        guardianId,
      })),
    };
  }

  const student = await prisma.student.update({
    where: { id },
    data: updateData,
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
      guardians: {
        include: {
          guardian: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              relationship: true,
              phone: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // Transform the data to match frontend expectations
  const transformedStudent = {
    ...student,
    guardianIds: student.guardians.map(sg => sg.guardianId),
    guardians: student.guardians.map(sg => sg.guardian),
  };

  res.json({
    success: true,
    data: { student: transformedStudent },
  });
};

export const deleteStudent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existingStudent = await prisma.student.findUnique({
    where: { id },
  });

  if (!existingStudent) {
    const error: AppError = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Soft delete by setting isActive to false
  await prisma.student.update({
    where: { id },
    data: { isActive: false },
  });

  res.json({
    success: true,
    message: "Student deleted successfully",
  });
};