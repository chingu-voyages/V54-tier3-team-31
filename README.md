# GoalFLow

## Getting Started

First, run the development server:

## Requirements

- pnpm

## Setup

> Note: Navigate to the project directory before running these commands.

1. Install the project's dependencies using pnpm:

    ```shell
    pnpm i
    ```

2. Run the project in development mode:

   ```shell
   pnpm dev
   ```

## Database Config

> Create a new neon project

![Neon project](https://github.com/user-attachments/assets/62857967-c736-467b-bab1-7f1f87170c8b "neon projecT")

1. Get your database url it would look something like this:

> postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname?sslmode=require

2. Then paste it in `.env`, run this to generate a migrations 

```sh
 npx drizzle-kit generate
```

3. lastly run migrates

```sh
npx drizzle-kit migrate
```

4. optionally you could run the seed command to populate your database

```sh
pnpm run db:seed
```

So no. 2 and 3 are the prominent commands to remember

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Icon Config

- `Lucide` for everything
- [Icones](https://icones.js.org/collection) for icons not covered by Lucide.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
