import { test as base } from '@playwright/test';
import { PlaywrightHomePage } from '@pages/playwright/playwright-home.page';
import { PlaywrightMainPage } from '@pages/playwright/playwright-main.page';

type PomFixtures = {
  pw: {
    homePage: PlaywrightHomePage;
    mainPage: PlaywrightMainPage;
  };
};

export const test = base.extend<PomFixtures>({
  pw: async ({ page }, use) => {
    await use({
      homePage: new PlaywrightHomePage(page),
      mainPage: new PlaywrightMainPage(page),
    });
  },
});

export { expect } from '@playwright/test';
