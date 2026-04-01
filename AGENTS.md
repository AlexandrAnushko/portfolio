<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## 🛠️ Development Environment

- **Language**: TypeScript (`^5`)
- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL via Prisma 7 (`@prisma/adapter-pg`)
- **Auth**: NextAuth v4 (Google OAuth)
- **Testing**: Jest 30 + React Testing Library
- **Linting**: ESLint 9 with `eslint-config-next`
- **Package Manager**: `npm`
- **Path alias**: `@/*` → `./src/*`

## 📂 Project Structure

```
.
├── src/
│   ├── app/                     # App Router (pages, layouts, server actions, API routes)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── actions/             # Server actions (todos, folders, contact, admin)
│   │   ├── admin/
│   │   ├── api/auth/            # NextAuth + custom auth endpoints
│   │   ├── contact/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── todos/
│   ├── features/                # Feature-specific components (auth, home, todos, etc.)
│   ├── generated/prisma/        # Auto-generated Prisma client (do not edit)
│   ├── lib/                     # Auth options, DB singleton, providers
│   ├── prisma/                  # Schema + migrations
│   ├── shared/                  # Reusable components, hooks, utils, constants, types
│   └── types/                   # Global type augmentations (e.g. next-auth.d.ts)
├── public/
├── eslint.config.mjs
├── jest.config.ts
├── prisma.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
└── package.json
```

## 🔑 Key Libraries

- **Forms**: React Hook Form + Zod (via `@hookform/resolvers`)
- **Animations**: Framer Motion (route transitions in `MotionTemplate`)
- **Icons**: Lucide React
- **Toasts**: Sonner
- **Utilities**: `clsx` + `tailwind-merge` (via `cn()`), `date-fns`
- **Skeletons**: use `@/shared/components/skeletons`

## ⚙️ Dev Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (runs `prisma generate` first)
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Test**: `npm run test`
- **Migrate**: `npm run migrate -- <name>`

## 🧪 Testing Practices

- **Testing Library**: `@testing-library/react` + `@testing-library/jest-dom`
- **Mocking**: `jest.mock()` for Prisma client, Next.js modules, server actions
- **Test command**: `npm run test`
- **Config**: `jest.config.ts` (jsdom env, ts-jest, path alias mapping)
- Organize tests in `tests/` folders co-located with the code they test

## 🧱 Component Guidelines

- Style components with Tailwind utility classes
- Use `cn()` from `@/shared/utils/cn` for conditional class merging
- Reusable components live in `src/shared/components/`
- Feature-specific components live in `src/features/<feature>/`
- Forms: define Zod schema → `useForm()` with `zodResolver` → typed `<Input<T>>` components

Rules:

- Move repeated UI into reusable components
- Keep side effects out of UI components when possible
- Prefer server-side data fetching unless client interactivity is required

## 📝 Code Style Standards

- Prefer arrow functions
- Prefer named exports for shared modules
- Extract repeated logic into hooks or helpers
- Annotate return types
- Always destructure props
- Avoid `any` type, use `unknown` or strict generics
- Group imports: react → next → libraries → local
- Add comments only when intent is non-obvious

## 🗄️ Database & ORM

- **Schema**: `src/prisma/schema.prisma`
- **Models**: User, Todo, TodoFolder, ContactMessage
- **Roles**: USER, ADMIN (enum)
- **Client**: Generated to `src/generated/prisma/` — do not edit
- **Connection**: Singleton pattern in `src/lib/db.ts` using `PrismaPg` adapter
- **Env vars**: `DATABASE_URL`

## 🔐 Auth & Security

- NextAuth with Google OAuth provider (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
- Session via JWT with `userId` and `role` injected in callbacks
- Custom `useAuth()` hook for client-side session access
- Validate all server-side inputs (server actions, API routes)
- Protect sensitive routes with session/role checks

## Content Guidelines

- Use concise, confident language
- Avoid hype and empty marketing phrases
