This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Git Workflow Rules

This repository now uses Husky to enforce the solo workflow below.

### Branch names

Allowed branch names:

- `main`
- `feature/task-name`
- `fix/task-name`
- `chore/task-name`
- `docs/task-name`
- `refactor/task-name`
- `test/task-name`

The branch suffix must be kebab-case.

### Commit messages

Commit messages must:

- start with an imperative verb such as `Implement`, `Fix`, `Add`, `Refactor`, or `Update`
- stay at 72 characters or less
- not end with a period

Examples:

- `Implement basic service discovery`
- `Fix auth exception`
- `Add rabbitmq health check`

### Push validation

Before every push, Husky runs:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

If any of those fail, the push is blocked.

### Solo developer flow

```bash
git checkout main
git pull origin main
git checkout -b feature/task-name

# work normally
git add .
git commit -m "Implement basic service discovery"
git push origin feature/task-name

# after merging on GitHub
git checkout main
git pull origin main
git branch -d feature/task-name
```

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
