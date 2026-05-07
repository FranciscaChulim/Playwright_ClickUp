import { BasePage } from '@pages/base.page';
import { Page, Locator } from '@playwright/test';
import { URLS } from '@data/constants';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;

  constructor( page: Page) {
    super(page);
    this.emailInput = page.locator('[data-test="form__email-input"]');
    this.passwordInput = page.locator('[data-test="form__password-input"]');
    this.loginBtn = page.locator('[data-test="login-submit"]');
  }

  async navigateTo() {
    await this.page.goto(`${URLS.BASE_URL}${URLS.LOGIN}`);
  }

   async waitForPageReady() {
      await this.waitUntilStable(this.emailInput);
  }

  async login(user: string, pass: string) {
    await this.emailInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginBtn.click();
  }
}
