import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await bcrypt.hash('password123', 10);

    await prisma.user.createMany({
      data: [
        {
          email: 'admin@example.com',
          password,
          name: 'Admin User',
          role: 'admin'
        },
        {
          email: 'user@example.com',
          password,
          name: 'Test User',
          role: 'user'
        }
      ],
      skipDuplicates: true
    });

    console.log('Database seeded');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();