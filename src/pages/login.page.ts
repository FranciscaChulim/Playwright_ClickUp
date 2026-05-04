import { Page, Locator } from '@playwright/test';
import { URLS } from '@data/constants';

export class LoginPage {
  private readonly page: Page;
  public readonly loginEmailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;

  constructor( page: Page) {
    this.page = page;
    this.loginEmailInput = page.locator('[data-test="form__email-input"]');
    this.passwordInput = page.locator('[data-test="form__password-input"]');
    this.loginBtn = page.locator('[data-test="login-submit"]');
  }

  async navigate() {
    await this.page.goto(`${URLS.BASE_URL}${URLS.LOGIN}`);
  }

  async login(user: string, pass: string) {
    await this.loginEmailInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginBtn.click();
  }
}
