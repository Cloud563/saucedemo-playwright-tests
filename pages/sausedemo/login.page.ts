import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { LoginErrors } from '@test-data/saucedemo/login-page';

export class SausedemoLoginPage extends BasePage {
  readonly url = 'https://www.saucedemo.com/';
  readonly title: Locator;
  readonly userNameInput: Locator;
  readonly userNameInputErrorIcon: Locator;
  readonly userPasswordInput: Locator;
  readonly userPasswordInputErrorIcon: Locator;
  readonly loginError: Locator;
  readonly loginErrorCloseButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.locator('noscript');
    this.userNameInput = this.page.getByTestId('username');
    this.userNameInputErrorIcon = this.userNameInput.locator('+ .error_icon');
    this.userPasswordInput = this.page.getByPlaceholder('Password');
    this.userPasswordInputErrorIcon = this.userPasswordInput.locator('+ .error_icon');
    this.loginError = this.page.locator('.error-message-container');
    this.loginErrorCloseButton = this.loginError.getByTestId('error-button');
    this.loginButton = this.page.getByRole('button').filter({ hasText: 'Login' });
  }

  async assertLoginError(visible: boolean, errorText?: LoginErrors): Promise<void> {
    const elements = [this.userNameInputErrorIcon, this.userPasswordInputErrorIcon, this.loginErrorCloseButton];

    for (const element of elements) {
      if (visible) {
        await expect(element).toBeVisible();
      } else {
        await expect(element).not.toBeVisible();
      }
    }

    if (errorText) {
      await expect(this.loginError).toBeVisible();
      await expect(this.loginError).toHaveText(errorText);
    }
  }
}
