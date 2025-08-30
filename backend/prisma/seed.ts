import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Define hashPassword function
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  // Test database connection
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    return;
  }

  // Check if admin already exists with the specific email
  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: "admin@example.com", // Check by specific email
    },
  });

  if (existingAdmin) {
    console.log("Admin user already exists:", existingAdmin);
    return;
  }

  try {
    // Create admin user
    const hashedPassword = await hashPassword("admin123");
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: UserRole.ADMIN,
        isApproved: true,
      },
    });
    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
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