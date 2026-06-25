import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL: string = process.env.BASE_URL?.trim() || 'https://speak-ukrainian.org.ua';
const BASE_URL_API: string = process.env.BASE_URL_API?.trim() || 'http://localhost:3000';
const HEADLESS: boolean = process.env.HEADLESS !== 'false';
const TEST_EMAIL: string | undefined = process.env.TEST_EMAIL;
const TEST_PASSWORD: string | undefined = process.env.TEST_PASSWORD;
const TEST_EMAIL_API: string | undefined = process.env.TEST_EMAIL_API;
const TEST_PASSWORD_API: string | undefined = process.env.TEST_PASSWORD_API;

const TEST_TIMEOUTS = {
  defaultE2E: 60_000,
  longE2E: 90_000,
  expect: 10_000,
  action: 15_000,
} as const;

export default {
  BASE_URL,
  BASE_URL_API,
  HEADLESS,
  TEST_EMAIL,
  TEST_PASSWORD,
  TEST_EMAIL_API,
  TEST_PASSWORD_API,
  TEST_TIMEOUTS,
};
