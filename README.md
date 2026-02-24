# Asif Cybersecurity Platform

Production-grade personal cybersecurity platform built with Next.js 14 + Prisma + PostgreSQL.

## Folder Structure

- `app/` App router pages, admin panel, API routes
- `components/` UI and section components
- `lib/` Business logic, auth, security, analytics
- `prisma/` Database schema
- `types/` Shared typings
- `hooks/` Custom hooks (reserved)
- `middleware.ts` Security middleware

## Setup

1. Copy `.env.example` to `.env` and configure secrets.
2. Install deps: `npm install`
3. Prisma generate: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Seed an admin account (create `User` with `ADMIN` role and bcrypt hash).
6. Start app: `npm run dev`

## Security Controls

- Strict security headers and CSP in `next.config.ts`
- Credentials-only admin auth with role checks
- `requireAdmin`, `validateInput`, and `withRateLimit` reusable guards
- Input validation with Zod for public routes
- Contact + analytics routes rate limited
- No third-party trackers or CDN scripts
- Privacy-safe analytics aggregation model

## Deployment

### Vercel

1. Provision PostgreSQL (Neon, Supabase, RDS, etc.)
2. Set all `.env.example` values in project settings
3. Configure build command: `npm run build`
4. Run `npm run prisma:migrate` during deployment pipeline

### VPS (Ubuntu + PM2 + Nginx)

1. Install Node.js 20+, PostgreSQL, and Nginx
2. Clone repo and set `.env`
3. `npm ci && npm run prisma:generate && npm run build`
4. `npm run prisma:migrate`
5. Start with PM2: `pm2 start npm --name asif-platform -- start`
6. Nginx reverse proxy to `localhost:3000`
7. Enable TLS with Let's Encrypt and enforce HTTPS

## Database Setup Instructions

- Create database: `CREATE DATABASE asif_platform;`
- Create least-privileged DB user for app runtime
- Run migrations from CI/CD only
- Enable PITR and daily backups

## Production Readiness Checklist

- [ ] All secrets rotated and stored in secret manager
- [ ] Admin password hash generated with strong passphrase
- [ ] Prisma migrations applied in production
- [ ] CSP audited for final script/style policies
- [ ] Rate limits tuned from load testing
- [ ] Error monitoring configured without PII
- [ ] Backup restore test completed
- [ ] Lighthouse performance/security audit >95
- [ ] RTC disabled by default unless explicit need
