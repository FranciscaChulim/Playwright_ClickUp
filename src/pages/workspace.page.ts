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
}