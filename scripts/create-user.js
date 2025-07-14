import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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