import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { WorkspacePage } from '../pages/workspace.page'; 

// 1. Define the types for your fixtures
type MyFixtures = {
  loginPage: LoginPage;
  workspacePage: WorkspacePage;
};

// 2. Extend the base test to include your Page Objects
export const test = base.extend<MyFixtures>({
  
  // Setup the LoginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Setup the WorkspacePage fixture
  workspacePage: async ({ page }, use) => {
    const workspacePage = new WorkspacePage(page);
    await use(workspacePage);
  },
});

export { expect };
