import { PrismaClient } from '@prisma/client';

// Simple, safe Prisma client for Next.js
let prismaClient: PrismaClient;

// This ensures we don't create multiple connections in development
if (typeof window === 'undefined') {
  // Server-side only
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }
  prismaClient = (globalThis as any).prisma;
} else {
  // Client-side - we don't need Prisma Client
  prismaClient = new PrismaClient();
}

export default prismaClient;
