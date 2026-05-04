import { Page, Locator } from '@playwright/test';

export class WorkspacePage {
  readonly page: Page;
  readonly pickerToggleBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pickerToggleBtn = page.locator('[data-test="workspace-picker-toggle__button"]');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async pickerToggleBtnVisible() {
    try {
      await this.pickerToggleBtn.waitFor({ state: 'visible', timeout: 45000 });
    } catch (error) {
      console.error("Timeout reached. Capturing failure screenshot...");
      await this.page.screenshot({ path: 'auth-failure.png', fullPage: true });
      throw error;
    }
  }
}