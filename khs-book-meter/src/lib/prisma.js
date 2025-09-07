import { PrismaClient } from "../generated/prisma";

const prisma = global.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
