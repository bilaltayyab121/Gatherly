import { PrismaClient, UserRole } from '@prisma/client';
import { hashPassword } from '../src/utils/helpers';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: UserRole.ADMIN }
  });

  if (!existingAdmin) {
    // Create admin user
    const hashedPassword = await hashPassword('admin123'); // Change this password
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com', // Change this email
        password: hashedPassword,
        role: UserRole.ADMIN,
        isApproved: true,
      },
    });
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });