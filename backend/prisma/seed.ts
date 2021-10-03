// npx prisma migrate dev --name init
// npx prisma db seed --preview-feature

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: '1',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '2',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: '3',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
