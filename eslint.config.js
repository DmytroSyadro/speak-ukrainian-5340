import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.{ts,js}'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error',
    },
  },

  {
    files: ['*/**/*.{ts,tsx,js}'],
    ignores: ['.github/**/*', '.vscode/**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx,js}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '*/**/': 'KEBAB_CASE',
        },
      ],
    },
  },

  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  eslintConfigPrettier
);
