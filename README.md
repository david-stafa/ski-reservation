This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Installation 

1. npx create-next-app@latest
2. npm install prisma --save-dev
3. npx prisma init --datasource-provider sqlite


Prisma commands:
- npx prisma migrate dev --name init
    - update the database schema
- 

Nice tutorial How to use prisma (read before deploy!):
[How to use Prisma ORM and Prisma Postgres with Next.js 15 and Vercel | Prisma Documentation](https://www.prisma.io/docs/guides/nextjs)



Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

New production database - Neon

✅ Goal
Development: use SQLite (already working).
Production: use Neon PostgreSQL on Vercel.

🔧 Step-by-step Setup (Recap)
1. Create Neon Database
Done via Vercel integration or directly on Neon.

You should now have a PostgreSQL connection string that looks like:
postgres://user:password@host.neon.tech/dbname

2. Update .env Files
Keep SQLite for local development:

DATABASE_URL="file:./dev.db"

Add production DB connection for deployment:
DATABASE_URL_PROD="postgres://user:password@host.neon.tech/dbname"

Vercel Setup:
Go to your project on Vercel → Settings → Environment Variables.

Add:
DATABASE_URL=postgres://user:password@host.neon.tech/dbname
(You can paste from DATABASE_URL_PROD.)

3. Update schema.prisma
Use this logic in your schema.prisma:

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
✅ This way, it uses whatever DATABASE_URL is defined at runtime (SQLite locally, Neon on Vercel).

4. Generate Client + Migrate Production DB
Run locally (⚠️ only once):

npx prisma migrate reset --schema ./prisma/schema.prisma
OR to push schema without creating new migrations:

npx prisma db push --schema ./prisma/schema.prisma
Then generate the client:

npx prisma generate

OR 

Automate Prisma DB Sync on Deploy
In your package.json, add:
"scripts": {
  "postinstall": "prisma generate && prisma db push"
}
On deploy, Vercel will:

Install dependencies
Generate Prisma client
Push your Prisma schema to Neon automatically

🔒 Make sure your DATABASE_URL is correctly set in Vercel’s Environment Variables!

5. Deploy to Vercel
Once pushed:

Vercel will use your production DATABASE_URL (Neon).

Everything works.

