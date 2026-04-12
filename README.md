# SkillBridge Frontend

SkillBridge frontend application built with Next.js App Router. It provides the
user-facing experience for authentication, role-based dashboards, course and
tutor workflows, booking flows, and review interactions.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- better-auth (client integration)
- Radix UI primitives + shadcn-style component setup

## Key Features

- Role-aware dashboard routing for multiple user types
- Authentication flows (login, signup, verify email, social auth integration)
- Modular actions and services layer for API communication
- Reusable UI components under a structured design system
- Route protection and middleware-based request handling

## Project Structure

```text
src/
  app/                # App Router pages and layouts
  actions/            # Server and client action handlers
  services/           # API/service abstraction layer
  components/         # UI and feature components
  routes/             # Role-based route definitions
  lib/                # Utilities, auth helpers, axios clients
  types/              # Shared TypeScript types
  zod/                # Validation schemas
```

## Prerequisites

- Node.js 20+
- pnpm (recommended)

## Environment Variables

Create a `.env.local` file in the project root.

| Variable                    | Required | Purpose                                                                  |
| --------------------------- | -------- | ------------------------------------------------------------------------ |
| `BACKEND_URL`               | No       | Backend base URL (default: `http://localhost:5000` in development).      |
| `FRONTEND_URL`              | No       | Frontend base URL (default: `http://localhost:3000` in development).     |
| `API_URL`                   | No       | Full API base URL override (example: `http://localhost:5000/api/v1`).    |
| `AUTH_URL`                  | No       | Auth endpoint base override (example: `http://localhost:5000/api/auth`). |
| `NEXT_PUBLIC_API_BASE_URL`  | No       | Public API base used in client-side requests.                            |
| `NEXT_PUBLIC_AUTH_BASE_URL` | No       | Public Better Auth endpoint base URL.                                    |
| `NEXT_PUBLIC_FRONTEND_URL`  | No       | Public frontend URL for callback and redirect flows.                     |

### Example `.env.local`

```env
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_AUTH_BASE_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## Installation

```bash
pnpm install
```

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build production bundle
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Run Locally

```bash
pnpm dev
```

Open http://localhost:3000.

## Production Notes

- Configure frontend and backend URLs consistently across both apps.
- Ensure cookie/auth domains and trusted origins match deployment domains.
- Keep `NEXT_PUBLIC_*` variables aligned with deployed API/auth URLs.
