import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  abstract readonly url: string;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.url);
    await this.page.waitForLoadState('load');
  }
}
