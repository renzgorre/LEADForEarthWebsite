import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma CLI config. Only used by `prisma generate` / `prisma migrate` etc.
// The runtime adapter (Neon serverless driver) lives on the PrismaClient in
// src/lib/prisma.ts; CLI commands connect directly via `datasource.url`.
//
// DATABASE_URL is Neon's pooled connection (used at runtime).
// DIRECT_URL is the unpooled connection; required by `prisma migrate` because
// Neon's pooler doesn't support the Postgres advisory locks migrations need.
//
// `prisma generate` doesn't need a connection, so a missing URL must not break
// `npm install` (postinstall runs generate). Commands that do need one, like
// `prisma migrate`, will report the missing datasource themselves.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(url ? { datasource: { url } } : {}),
});
