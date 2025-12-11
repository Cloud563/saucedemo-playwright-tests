import { test as base, type Page } from '@playwright/test';
import { SausedemoLoginPage } from '@pages/sausedemo/login.page';

const createPageFixture =
  <T>(PageClass: new (page: Page) => T) =>
  async ({ page }: { page: Page }, use: (instance: T) => Promise<void>) => {
    await use(new PageClass(page));
  };

type PageFixtures = {
  sausedemoLoginPage: SausedemoLoginPage;
};

export const test = base.extend<PageFixtures>({
  sausedemoLoginPage: createPageFixture(SausedemoLoginPage),
});

export { expect } from '@playwright/test';
