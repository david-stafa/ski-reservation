import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// Create Prisma client with explicit production database URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PROD
    }
  }
});

async function createUser() {
  try {
    const password = '123456789';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
      },
    });
    
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
