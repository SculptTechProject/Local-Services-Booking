const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeEach(async () => {
  // Czyszczenie danych w tabelach przed każdym testem
  await prisma.booking.deleteMany();
  await prisma.client.deleteMany();
  await prisma.service.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
