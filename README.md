# speak-ukrainian-5340

UI test automation project for the [Speak Ukrainian](https://speak-ukrainian.org.ua) website using Playwright and TypeScript.

## 📊 Test Reports

[![Allure Report](https://img.shields.io/badge/Allure-View%20Report-brightgreen?logo=allure)](https://UA-5340-TAQC.github.io/speak-ukrainian-5340/main/index.html)

## Tech stack

- [Playwright Test](https://playwright.dev)
- TypeScript
- [Allure](https://allurereport.org) (via `allure-playwright`)
- ESLint + Prettier
- dotenv

## Prerequisites

- Node.js LTS (20+ recommended)
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
BASE_URL=https://speak-ukrainian.org.ua
TEST_EMAIL=your-test-account@example.com
TEST_PASSWORD=your-test-password
HEADLESS=false
```

| Variable        | Required | Default                           | Description                          |
| --------------- | -------- | --------------------------------- | ------------------------------------ |
| `BASE_URL`      | No       | `https://speak-ukrainian.org.ua`  | Target site URL                      |
| `TEST_EMAIL`    | No       | —                                 | Account email for authenticated tests |
| `TEST_PASSWORD` | No       | —                                 | Account password for authenticated tests |
| `HEADLESS`      | No       | `true`                            | Set to `false` for headed local runs |

## Run tests

Run all tests across all browsers:

```bash
npm test
```

Run tests for a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific spec file:

```bash
npx playwright test tests/sign-in-successful-login.spec.ts
```

## Reports

After execution, open the Allure report:

```bash
npm run report
```

## Lint and formatting

```bash
npm run lint           # run ESLint
npm run lint:fix       # auto-fix ESLint issues
npm run format         # format with Prettier
npm run format:check   # check formatting without writing
```

Pre-commit convenience script (format, lint:fix, lint, format:check):

```bash
npm run pc
```

## CI

GitHub Actions workflow is defined in `.github/workflows/playwright.yml` and runs on pushes and pull requests to `main`.

The pipeline has three jobs:

1. **lint-and-format** — checks Prettier formatting and runs ESLint.
2. **run-tests** — runs Playwright tests in parallel across Chromium, Firefox, and WebKit; uploads Allure results as artifacts.
3. **generate-report** — merges results from all browsers, generates a combined Allure report with history, deploys it to GitHub Pages, and posts a link comment on pull requests.

Allure reports are published to:
- `main` branch runs: `https://UA-5340-TAQC.github.io/speak-ukrainian-5340/main/`
- Pull request runs: `https://UA-5340-TAQC.github.io/speak-ukrainian-5340/pr-<number>/`

## Project structure

```text
config/          Environment config and shared test timeouts
data/            Static test data and data builders
fixtures/        Custom Playwright fixtures (page, modal)
modals/          Modal component objects
pages/           Page objects
tests/           Test specs
```

## Notes

- `playwright.config.ts` is configured for Chromium, Firefox, and WebKit at 1920×1080.
- The reporter is `allure-playwright`; results are written to `allure-results/`.
- `headless` is controlled by the `HEADLESS` environment variable (`true` by default).
- On CI, tests retry up to 2 times and run with 2 workers per browser.
