# Asif Cybersecurity Platform

Production-grade personal cybersecurity platform built with Next.js 14 + Prisma + PostgreSQL.

## Folder Structure

- `app/` App router pages, admin panel, API routes
- `components/` UI and section components
- `lib/` Business logic, auth, security, analytics
- `prisma/` Database schema
- `types/` Shared typings
- `middleware.ts` Security middleware

## Setup

1. Copy `.env.example` to `.env` and configure secrets.
2. Install deps: `npm install`
3. Prisma generate: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Seed an admin account (create `User` with `ADMIN` role and bcrypt hash).
6. Start app: `npm run dev`

## Security Controls

- Strict security headers and CSP in middleware + Next config
- Credentials-only admin auth with role checks and centralized `requireAdminSession` / `requireAdminApiSession`
- Origin validation via `TRUSTED_ORIGIN`
- Unified API error format `{ ok:false, error:{ code, message, details? } }`
- Route-level Zod validation, in-memory rate limiting, and upload MIME/size validation
- Private uploads in `.uploads` with authenticated download endpoint
- Privacy-safe analytics model (aggregated counts only)

## Deployment Guide

### Vercel

1. Provision PostgreSQL (Neon, Supabase, RDS, etc.)
2. Set all `.env.example` values in project settings
3. Build command: `npm run build`
4. Add migration step in CI/CD: `npm run prisma:migrate`
5. Ensure `TRUSTED_ORIGIN` equals production URL

### VPS (Ubuntu + PM2 + Nginx)

1. Install Node.js 20+, PostgreSQL, Nginx
2. Clone repo, create `.env`, run `npm ci`
3. `npm run prisma:generate && npm run build && npm run prisma:migrate`
4. Start with PM2: `pm2 start npm --name asif-platform -- start`
5. Nginx reverse proxy to `localhost:3000`
6. Enable TLS (Let’s Encrypt) and force HTTPS
7. Keep `.uploads` on persistent storage with strict file permissions
