import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitUntilStable(locator?: Locator) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('load');

    if (locator) {
      await locator.waitFor({ state: 'visible', timeout: 45000 });
      await expect(locator).toBeEnabled();
    }
  }

  async navigateTo(url: string, stabilityLocator?: Locator) {
    await this.page.goto(url);
    await this.waitUntilStable(stabilityLocator);
  }

  async safeClick(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }
}