import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/node_modules/', '**/playwright-report/', '**/test-results/', '**/allure-results/'],
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.strict, prettier],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['recommended'].rules,
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'off',
      'playwright/prefer-lowercase-title': 'off',
      'playwright/no-nested-step': 'error',
      'playwright/valid-expect-in-promise': 'error',
      'playwright/no-force-option': 'warn',
    },
  },
  {
    files: ['**/*.page.ts'],
    plugins: {
      playwright,
    },
    rules: {
      'playwright/no-element-handle': 'error',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/valid-expect': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/prefer-strict-equal': 'error',
      'playwright/valid-expect-in-promise': 'error',
      'playwright/no-force-option': 'warn',
    },
  },
);
