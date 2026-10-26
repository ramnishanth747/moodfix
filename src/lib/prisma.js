const { PrismaClient } = require('@prisma/client');

// Reuse a single instance of PrismaClient in development to avoid exhausting connection pools
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
