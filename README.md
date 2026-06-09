# speak-ukrainian-5340

UI test automation project for the Speak Ukrainian website using Playwright and TypeScript.

## Tech stack

- Playwright Test
- TypeScript
- ESLint + Prettier
- dotenv

## Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Environment setup

This project reads runtime settings from a local `.env` file via `config/env.ts`.

Create `.env` in the project root and add:

```env
BASE_URL=https://your-target-url.example
HEADLESS=false
```

`HEADLESS` defaults to `true` when not set. Use `HEADLESS=false` for local headed runs.

## Run tests

Run all tests:

```bash
npm test
```

Run tests in headed mode for a single browser:

```bash
npx playwright test --project=chromium
```

Run a specific spec file:

```bash
npx playwright test tests/speak-ukrainian.example.spec.ts
```

## Reports

After execution, open the HTML report:

```bash
npm run report
```

## Lint and formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

`npm run format` runs `prettier --write .` and formats the whole repository.

## CI

GitHub Actions workflow is defined in `.github/workflows/playwright.yml` and runs on pushes and pull requests to `main`.

Pipeline steps:

- Install dependencies with `npm ci`
- Check formatting with `npx prettier --check .`
- Run ESLint
- Install Playwright browsers with OS dependencies
- Execute Playwright tests
- Upload `playwright-report` artifact

## Project structure

```text
config/          Environment and shared config
fixtures/        Custom Playwright fixtures
pages/           Page objects and UI components
tests/           Test specs
```

## Notes

- `playwright.config.ts` is configured for Chromium, Firefox, and WebKit projects.
- The default reporter is Playwright HTML reporter.
- `headless` is controlled by `HEADLESS` from environment config.
