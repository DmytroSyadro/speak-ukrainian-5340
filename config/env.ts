import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL: string | undefined = process.env.BASE_URL;
const HEADLESS: boolean = process.env.HEADLESS !== 'false';

export default {
  BASE_URL,
  HEADLESS,
};
