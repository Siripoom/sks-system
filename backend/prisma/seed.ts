import { PrismaClient, Role, TripStatus, EventType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create schools
  const school1 = await prisma.school.create({
    data: {
      name: 'Lincoln Elementary School',
      address: '123 Oak Street, Springfield, IL 62701',
      phone: '+1-217-555-0101',
      email: 'admin@lincoln.edu'
    }
  });

  const school2 = await prisma.school.create({
    data: {
      name: 'Roosevelt Middle School', 
      address: '456 Maple Avenue, Springfield, IL 62702',
      phone: '+1-217-555-0102',
      email: 'office@roosevelt.edu'
    }
  });

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@sks.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1-217-555-0001',
      role: Role.ADMIN
    }
  });

  const driverUser1 = await prisma.user.create({
    data: {
      email: 'driver1@sks.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Smith',
      phone: '+1-217-555-0011',
      role: Role.DRIVER
    }
  });

  const driverUser2 = await prisma.user.create({
    data: {
      email: 'driver2@sks.com', 
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1-217-555-0012',
      role: Role.DRIVER
    }
  });

  const parentUser1 = await prisma.user.create({
    data: {
      email: 'parent1@example.com',
      password: hashedPassword,
      firstName: 'Michael',
      lastName: 'Davis',
      phone: '+1-217-555-0021',
      role: Role.PARENT
    }
  });

  const parentUser2 = await prisma.user.create({
    data: {
      email: 'parent2@example.com',
      password: hashedPassword,
      firstName: 'Lisa',
      lastName: 'Wilson',
      phone: '+1-217-555-0022', 
      role: Role.PARENT
    }
  });

  // Create drivers
  const driver1 = await prisma.driver.create({
    data: {
      userId: driverUser1.id,
      licenseNumber: 'DL12345678',
      schoolId: school1.id
    }
  });

  const driver2 = await prisma.driver.create({
    data: {
      userId: driverUser2.id,
      licenseNumber: 'DL87654321',
      schoolId: school2.id
    }
  });

  // Create guardians
  const guardian1 = await prisma.guardian.create({
    data: {
      userId: parentUser1.id,
      relationship: 'Father',
      emergencyContact: '+1-217-555-9001',
      address: '789 Pine Street, Springfield, IL 62703'
    }
  });

  const guardian2 = await prisma.guardian.create({
    data: {
      userId: parentUser2.id,
      relationship: 'Mother',
      emergencyContact: '+1-217-555-9002',
      address: '321 Cedar Lane, Springfield, IL 62704'
    }
  });

  // Create vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      licensePlate: 'BUS001',
      model: 'Blue Bird All American',
      capacity: 72,
      year: 2020,
      schoolId: school1.id
    }
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      licensePlate: 'BUS002',
      model: 'Thomas Built HDX',
      capacity: 54,
      year: 2019,
      schoolId: school2.id
    }
  });

  // Create students
  const student1 = await prisma.student.create({
    data: {
      firstName: 'Emma',
      lastName: 'Davis',
      grade: '3rd Grade',
      schoolId: school1.id,
      guardianId: guardian1.id
    }
  });

  const student2 = await prisma.student.create({
    data: {
      firstName: 'Alex',
      lastName: 'Wilson',
      grade: '6th Grade',
      schoolId: school2.id,
      guardianId: guardian2.id
    }
  });

  const student3 = await prisma.student.create({
    data: {
      firstName: 'Sophie',
      lastName: 'Davis',
      grade: '1st Grade',
      schoolId: school1.id,
      guardianId: guardian1.id
    }
  });

  // Create routes
  const route1 = await prisma.route.create({
    data: {
      name: 'Lincoln Elementary Morning Route A',
      description: 'Covers North Springfield residential area',
      schoolId: school1.id
    }
  });

  const route2 = await prisma.route.create({
    data: {
      name: 'Roosevelt Middle Afternoon Route B',
      description: 'Covers South Springfield and downtown area',
      schoolId: school2.id
    }
  });

  // Create stops
  await prisma.stop.createMany({
    data: [
      {
        name: 'Oak & 1st Street',
        address: '100 Oak Street, Springfield, IL',
        latitude: 39.8014,
        longitude: -89.6435,
        order: 1,
        routeId: route1.id
      },
      {
        name: 'Main Street Shopping Center',
        address: '200 Main Street, Springfield, IL',
        latitude: 39.8000,
        longitude: -89.6420,
        order: 2,
        routeId: route1.id
      },
      {
        name: 'Pine Street & 5th Avenue',
        address: '500 Pine Street, Springfield, IL',
        latitude: 39.7980,
        longitude: -89.6400,
        order: 1,
        routeId: route2.id
      }
    ]
  });

  // Create student-route assignments
  await prisma.studentRoute.createMany({
    data: [
      {
        studentId: student1.id,
        routeId: route1.id
      },
      {
        studentId: student3.id,
        routeId: route1.id
      },
      {
        studentId: student2.id,
        routeId: route2.id
      }
    ]
  });

  // Create assignments
  await prisma.assignment.createMany({
    data: [
      {
        driverId: driver1.id,
        vehicleId: vehicle1.id,
        studentId: student1.id
      },
      {
        driverId: driver1.id,
        vehicleId: vehicle1.id,
        studentId: student3.id
      },
      {
        driverId: driver2.id,
        vehicleId: vehicle2.id,
        studentId: student2.id
      }
    ]
  });

  // Create sample trips
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(7, 30, 0, 0);

  await prisma.trip.createMany({
    data: [
      {
        routeId: route1.id,
        vehicleId: vehicle1.id,
        driverId: driver1.id,
        status: TripStatus.SCHEDULED,
        scheduledAt: tomorrow
      },
      {
        routeId: route2.id,
        vehicleId: vehicle2.id,
        driverId: driver2.id,
        status: TripStatus.SCHEDULED,
        scheduledAt: new Date(tomorrow.getTime() + 8 * 60 * 60 * 1000) // 8 hours later
      }
    ]
  });

  // Create sample event logs
  await prisma.eventLog.createMany({
    data: [
      {
        type: EventType.USER_LOGIN,
        description: 'Admin user logged in',
        userId: adminUser.id,
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Chrome/120.0.0.0)'
      },
      {
        type: EventType.VEHICLE_ASSIGNED,
        description: 'Vehicle BUS001 assigned to driver John Smith',
        userId: adminUser.id,
        metadata: {
          vehicleId: vehicle1.id,
          driverId: driver1.id
        }
      }
    ]
  });

  console.log('Seed completed successfully!');
  console.log('Created:');
  console.log('- 2 schools');
  console.log('- 5 users (1 admin, 2 drivers, 2 parents)');
  console.log('- 2 drivers');
  console.log('- 2 guardians');
  console.log('- 2 vehicles');
  console.log('- 3 students');
  console.log('- 2 routes with 3 stops');
  console.log('- 3 assignments');
  console.log('- 2 scheduled trips');
  console.log('- 2 event logs');
  console.log('');
  console.log('Test credentials:');
  console.log('Admin: admin@sks.com / password123');
  console.log('Driver 1: driver1@sks.com / password123');
  console.log('Driver 2: driver2@sks.com / password123');
  console.log('Parent 1: parent1@example.com / password123');
  console.log('Parent 2: parent2@example.com / password123');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });