# 🇺🇦 speak-ukrainian-5340

UI test automation project for the [Speak Ukrainian](https://speak-ukrainian.org.ua) website using Playwright and TypeScript.

**Repository:** [UA-5340-TAQC/speak-ukrainian-5340](https://github.com/UA-5340-TAQC/speak-ukrainian-5340)

## 📊 Test Reports

[![Allure Report](https://img.shields.io/badge/Allure-View%20Report-brightgreen?logo=allure)](https://UA-5340-TAQC.github.io/speak-ukrainian-5340/main/index.html) Latest automated test results with detailed coverage

## 🛠 Tech Stack

- **Framework:** [Playwright Test](https://playwright.dev) — Modern browser automation
- **Language:** TypeScript — Type-safe test code
- **Reporting:** [Allure](https://allurereport.org) (via `allure-playwright`) — Detailed test metrics
- **Linting & Formatting:** ESLint + Prettier — Code quality
- **Configuration:** dotenv — Environment management

## 📋 Prerequisites

- **Node.js LTS** (v20 or higher recommended)
- **npm** (bundled with Node.js)

## 🚀 Quick Start

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Environment Setup

This project reads runtime settings from a local `.env` file via `config/env.ts`.

**Create `.env` in the project root:**

```env
BASE_URL=https://speak-ukrainian.org.ua
BASE_URL_API=http://localhost:3000
TEST_EMAIL=your-test-account@example.com
TEST_PASSWORD=your-test-password
HEADLESS=false
```

### Configuration Reference

| Variable        | Required | Default                          | Description                              |
| --------------- | -------- | -------------------------------- | ---------------------------------------- |
| `BASE_URL`      | No       | `https://speak-ukrainian.org.ua` | Target site URL                          |
| `BASE_URL_API`  | No       | `http://localhost:3000`          | API base URL                             |
| `TEST_EMAIL`    | No       | —                                | Account email for authenticated tests    |
| `TEST_PASSWORD` | No       | —                                | Account password for authenticated tests |
| `HEADLESS`      | No       | `true`                           | Set to `false` for headed local runs     |

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests by Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

### Run Specific Test File

```bash
npx playwright test tests/sign-in-successful-login.spec.ts
```

### Run Tests in Headed Mode

```bash
HEADLESS=false npm test
```

### Watch Mode (Development)

```bash
npx playwright test --watch
```

## 📈 Reports & Artifacts

### View Allure Report

After test execution, generate and view the Allure report:

```bash
npm run report
```

The report includes:

- Test execution timeline
- Pass/fail breakdown by browser
- Screenshots and videos for failed tests
- Execution history trends
- Detailed step-by-step logs

## 🔍 Code Quality

### Lint Code

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
```

### Format Code

```bash
npm run format         # Format with Prettier
npm run format:check   # Check formatting without writing
```

### Pre-Commit Checks

Run lint, format, and lint checks in order:

```bash
npm run pc             # Equivalent to format → lint:fix → lint → format:check
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow is configured in `.github/workflows/playwright.yml` and automatically runs on:

- Push to `main` branch
- Pull requests to `main` branch

### Pipeline Stages

1. **Lint & Format**
   - Checks Prettier formatting compliance
   - Runs ESLint analysis
   - Fails if code quality issues are found

2. **Run Tests**
   - Executes tests in parallel across Chromium, Firefox, and WebKit
   - 2 workers per browser
   - Auto-retries failed tests (up to 2 attempts)
   - Uploads Allure results as workflow artifacts

3. **Generate & Publish Report**
   - Merges test results from all browsers
   - Generates combined Allure report with history
   - Deploys to GitHub Pages
   - Posts report link comment on pull requests

### Report Locations

- **Main branch:** `https://UA-5340-TAQC.github.io/speak-ukrainian-5340/main/`
- **Pull requests:** `https://UA-5340-TAQC.github.io/speak-ukrainian-5340/pr-<number>/`

## 📁 Project Structure

```text
api/                  API client classes
config/               Environment config and test timeouts
data/                 Test data and data builders
fixtures/             Custom Playwright fixtures
modals/               Modal component objects
pages/                Page objects
tests/
├── api/              API endpoint tests
└── ui/               UI/E2E tests (organized by feature)
.github/              GitHub Actions workflows
```

### Key Files

- **playwright.config.ts** — Playwright test configuration
- **tsconfig.json** — TypeScript compiler options
- **eslint.config.js** — ESLint rules
- **.prettierrc** — Prettier formatting rules
- **package.json** — Dependencies and scripts

## 📝 Notes

- **Browsers:** Tests run on Chromium, Firefox, and WebKit at 1920×1080 resolution
- **Reporter:** Results written to `allure-results/` for Allure report generation
- **Headless Mode:** Controlled by `HEADLESS` environment variable (default: `true`)
- **CI Configuration:** 2 workers per browser, up to 2 retries on failure
- **Test Data:** Managed via builders in `data/` directory
- **Page Objects:** Located in `pages/` using the Page Object Model pattern
- **Test Organization:** API tests in `tests/api/`, UI tests in `tests/ui/` organized by feature
