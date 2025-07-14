# Prisma Schema Changes - Deployment Manual

## Overview
This manual provides step-by-step instructions for applying Prisma schema changes in both development and production environments for the Ski Reservation project.

## Project Setup
- **Development**: SQLite database
- **Production**: PostgreSQL database (Neon)
- **Framework**: Next.js 15 with Prisma ORM

## Prerequisites
- Node.js and npm installed
- Prisma CLI installed (`npm install -g prisma` or use `npx prisma`)
- Database access credentials for both environments
- Environment variables properly configured

## Development Environment

### Step 1: Create Migration
```bash
# Generate a new migration for your schema changes
npx prisma migrate dev --name add_user_model

# This command will:
# - Detect changes in your schema.prisma
# - Create a new migration file
# - Apply the migration to your local database
# - Regenerate the Prisma Client
```

### Step 2: Verify Migration
```bash
# Check migration status
npx prisma migrate status

# View the generated migration file
# Check: prisma/migrations/[timestamp]_add_user_model/migration.sql
```

### Step 3: Test Your Changes
```bash
# Start your development server
npm run dev

# Test your new User model functionality
# Ensure all existing features still work
```

### Step 4: Regenerate Prisma Client (if needed)
```bash
# Regenerate Prisma Client with new schema
npx prisma generate
```

## Production Environment

### Step 1: Prepare for Deployment
```bash
# Ensure all migrations are ready
npx prisma migrate status

# Build your application
npm run build
```

### Step 2: Deploy to Production
```bash
# Apply migrations to production database
npx prisma migrate deploy

# This command will:
# - Apply all pending migrations
# - NOT create new migrations
# - NOT regenerate the Prisma Client
```

### Step 3: Regenerate Prisma Client in Production
```bash
# Regenerate Prisma Client for production
npx prisma generate
```

### Step 4: Restart Your Application
```bash
# Restart your production application
npm run start
```

## Alternative: Using `prisma db push` (Development Only)

For rapid development iterations, you can use:
```bash
# Push schema changes directly (development only)
npx prisma db push

# This bypasses migrations and directly applies schema changes
# WARNING: Only use in development, never in production
```

## Environment-Specific Considerations

### Development (SQLite)
- Uses local SQLite database
- Can use `prisma db push` for quick iterations
- Migrations are stored in `prisma/migrations/`
- Database file: `dev.db`

### Production (PostgreSQL - Neon)
- Uses PostgreSQL database hosted on Neon
- **Always use migrations** (`prisma migrate deploy`)
- Never use `prisma db push` in production
- Ensure `DATABASE_URL` environment variable is properly configured in Vercel

## Environment Variables Setup

### Development (.env.local)
```env
DATABASE_URL="file:./dev.db"
```

### Production (Vercel Environment Variables)
```env
DATABASE_URL="postgres://user:password@host.neon.tech/dbname"
```

## Automated Deployment (Recommended)

### Using postinstall Script
Your `package.json` already includes:
```json
{
  "scripts": {
    "postinstall": "prisma generate && prisma db push"
  }
}
```

This automatically:
- Generates Prisma Client
- Pushes schema changes to database
- Runs on every Vercel deployment

## Troubleshooting

### Common Issues

1. **Migration Conflicts**
```bash
# Reset development database (WARNING: loses all data)
npx prisma migrate reset

# This will:
# - Drop the database
# - Recreate it
# - Apply all migrations
# - Seed the database (if seed script exists)
```

2. **Prisma Client Out of Sync**
```bash
# Regenerate Prisma Client
npx prisma generate

# Clear Prisma cache
npx prisma generate --force
```

3. **Database Connection Issues**
```bash
# Test database connection
npx prisma db pull

# Check current database state
npx prisma db push --preview-feature
```

4. **Production Database Issues**
```bash
# Check production database status
npx prisma migrate status

# Force reset production database (DANGEROUS)
npx prisma migrate reset --force
```

### Rollback Strategy
```bash
# If you need to rollback a migration
# 1. Create a new migration that reverses the changes
# 2. Apply the rollback migration
npx prisma migrate dev --name rollback_user_model
```

## Best Practices

1. **Always test migrations locally first**
2. **Backup production database before applying migrations**
3. **Use descriptive migration names**
4. **Review generated migration files before applying**
5. **Keep development and production schemas in sync**
6. **Use environment variables for database URLs**
7. **Never use `prisma db push` in production**
8. **Always use migrations for production deployments**

## Current Project Status

### Schema Models
- ✅ `Reservation` model (existing)
- ✅ `User` model (newly added)
- ✅ Proper UUID primary keys
- ✅ Timestamps (`createdAt`, `updatedAt`)
- ✅ Unique constraints where needed

### TODO Items from Schema
- ⚠️ Update database provider configuration for production
- ⚠️ Add `updatedAt` field to Reservation model
- ⚠️ Configure environment-based provider selection

## Quick Reference Commands

### Development
```bash
# Create and apply migration
npx prisma migrate dev --name migration_name

# Push schema changes (dev only)
npx prisma db push

# Generate client
npx prisma generate

# View database in browser
npx prisma studio
```

### Production
```bash
# Apply migrations
npx prisma migrate deploy

# Generate client
npx prisma generate

# Check migration status
npx prisma migrate status
```

### Database Management
```bash
# Reset database (dev only)
npx prisma migrate reset

# Pull schema from existing database
npx prisma db pull

# Push schema to database
npx prisma db push
```

## Deployment Checklist

### Before Deploying
- [ ] All migrations tested locally
- [ ] Prisma Client regenerated
- [ ] Application builds successfully
- [ ] Environment variables configured
- [ ] Database backup created (production)

### After Deploying
- [ ] Verify migrations applied successfully
- [ ] Test application functionality
- [ ] Check database connections
- [ ] Monitor application logs
- [ ] Verify new features work as expected

## Support Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js with Prisma Guide](https://www.prisma.io/docs/guides/nextjs)
- [Prisma Migration Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Neon PostgreSQL Documentation](https://neon.tech/docs)

---

**Last Updated**: December 2024  
**Project**: Ski Reservation System  
**Version**: 1.0 