import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL: string | undefined = process.env.BASE_URL;

export default {
  BASE_URL,
};
