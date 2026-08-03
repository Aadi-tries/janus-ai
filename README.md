# Janus AI

Janus AI is a Next.js decision-stress-testing app. It asks a user for a strategic objective, lets them choose adversarial AI personas, runs a hostile interview, triggers reality-attack scenarios, and produces a structured readiness report.

## Features

- **Decision intake**: capture an objective, background context, and optional supporting text files.
- **Adversarial persona panel**: choose all challengers or select focused personas such as Investor, Customer, Competitor, Risk Analyst, and Psychologist.
- **Persistent interview history**: decisions and messages are stored with Prisma and SQLite.
- **Reality attacks**: the interview flow can escalate from questioning into catastrophic scenario testing.
- **Readiness report**: generate scores, risks, blind spots, and recommendations from the transcript.

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7 with SQLite via `better-sqlite3`
- Google Gemini via `@google/genai`

## Getting started

### Prerequisites

- Node.js 24 or newer is recommended for the built-in TypeScript test runner used by `npm test`.
- npm

### Installation

```bash
npm install
cp .env.example .env
npx prisma generate
```

Set `GEMINI_API_KEY` in `.env` before using AI endpoints. The app can build without the key, but interview and report generation require it at runtime.

### Database

The default local database is SQLite:

```bash
npx prisma db push
```

This creates or updates the SQLite database defined by `DATABASE_URL`.

### Development

```bash
npm run dev
```

Open <http://localhost:3000>.

### Production build and run

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project structure

```text
src/app/                 Next.js pages and API routes
src/app/api/decisions    Decision and message persistence endpoints
src/app/api/interview    Gemini-powered adversarial interview endpoint
src/app/api/report       Gemini-powered readiness report endpoint
src/components           Shared UI primitives
src/constants            Agent definitions
src/lib                  Prisma, AI, and validation utilities
src/types                Shared application types
tests                    Node test-runner tests
prisma                   Prisma schema
```

## Notes for maintainers

- API route inputs should be normalized through `src/lib/validation.ts` before use.
- `npm test` includes a guard against unresolved merge conflict markers, so run it after rebases or conflict resolutions.
- Generated `.next` output is ignored by ESLint; run `npm run lint` from a clean checkout or after builds.
- If a production build logs `API key should be set when using the Gemini API`, that is an environment warning from the Gemini client. Runtime AI calls still require a valid `GEMINI_API_KEY`.
