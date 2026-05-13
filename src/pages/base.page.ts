import { Page, Locator, expect } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '@utils/constants';

export class BasePage {
  readonly page: Page;
  readonly pickerToggleBtn: Locator;
  readonly sidebarCollapsedContainer: Locator;
  readonly globalSidebarContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pickerToggleBtn = page.locator('[data-test="workspace-picker-toggle__button"]');
    this.sidebarCollapsedContainer= this.page.locator('[data-test="simple-bar__collapsed-container__true"]');
    this.globalSidebarContainer = this.page.locator('[data-test="global-sidebar-container"]');
  }

  async waitUntilStable(locator?: Locator) {
    await this.page.waitForLoadState('load');

    if (locator) {
      await locator.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
      await expect(locator).toBeVisible();
    }
  }

  async verifyWorkspaceName(expectedName: string) {
    await expect(this.pickerToggleBtn).toHaveText(new RegExp(expectedName), { timeout: DEFAULT_TIMEOUT });
  }

  async navigateTo(url: string, stabilityLocator?: Locator) {
    await this.page.goto(url);
    await this.waitUntilStable(stabilityLocator);
  }
}