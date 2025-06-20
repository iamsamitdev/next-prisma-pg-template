import { PrismaClient } from '../generated/prisma'

// สร้าง globalForPrisma สำหรับการจัดการกับ Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// สร้าง prisma สำหรับการจัดการกับ Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// ถ้าเป็น production จะไม่สร้าง Prisma Client ใหม่
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 