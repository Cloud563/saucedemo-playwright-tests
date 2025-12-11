import { test } from '@fixtures/fixtures';
import { LoginErrors, LOGINS, PASSWORD_VALID } from '@test-data/saucedemo/login-page';
import { RandomStringGenerator } from '@helpers/common/string-generator';

const randomText = RandomStringGenerator.allSymbols(15);

test.describe('Тестирование страницы логина saucedemo', () => {
  test('Проверка ошибок входа на странице логина', async ({ sausedemoLoginPage }) => {
    await test.step('Открыть страницу логина', async () => {
      await sausedemoLoginPage.goto();
      await sausedemoLoginPage.assertLoginError(false);
    });

    await test.step('Нажать кнопку Login, не заполняя данные', async () => {
      await sausedemoLoginPage.loginButton.click();
      await sausedemoLoginPage.assertLoginError(true, LoginErrors.EMPTY_LOGIN);
    });

    await test.step('Заполнить только логин, нажать кнопку Login', async () => {
      await sausedemoLoginPage.userNameInput.fill(randomText);
      await sausedemoLoginPage.loginButton.click();
      await sausedemoLoginPage.assertLoginError(true, LoginErrors.EMPTY_PASSWORD);
    });

    await test.step('Заполнить только пароль, нажать кнопку Login', async () => {
      await sausedemoLoginPage.userNameInput.clear();
      await sausedemoLoginPage.userPasswordInput.fill(randomText);
      await sausedemoLoginPage.loginButton.click();
      await sausedemoLoginPage.assertLoginError(true, LoginErrors.EMPTY_LOGIN);
    });

    await test.step('Ввести некорректные данные для входа, нажать кнопку Login', async () => {
      await sausedemoLoginPage.userNameInput.fill(randomText);
      await sausedemoLoginPage.userPasswordInput.fill(randomText);
      await sausedemoLoginPage.loginButton.click();
      await sausedemoLoginPage.assertLoginError(true, LoginErrors.INVALID_LOGIN);
    });

    await test.step('Ввести данные заблокированного пользователя, нажать кнопку Login', async () => {
      await sausedemoLoginPage.userNameInput.fill(LOGINS.lockedUser);
      await sausedemoLoginPage.userPasswordInput.fill(PASSWORD_VALID);
      await sausedemoLoginPage.loginButton.click();
      await sausedemoLoginPage.assertLoginError(true, LoginErrors.LOCKED_USER);
    });

    await test.step('Закрыть ошибку', async () => {
      await sausedemoLoginPage.loginErrorCloseButton.click();
      await sausedemoLoginPage.assertLoginError(false);
    });
  });
});
