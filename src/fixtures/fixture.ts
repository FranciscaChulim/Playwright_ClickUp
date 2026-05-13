import { test as base, request as playwrightRequest } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { WorkspacePage } from '@pages/workspace.page'; 
import { SpaceApi } from '@api/space.api';
import { TaskApi } from '@api/task.api';
import { CREDENTIALS } from '@utils/constants';

type MyFixtures = {
  loginPage: LoginPage;
  workspacePage: WorkspacePage;
  spaceApi: SpaceApi;
  taskApi: TaskApi;
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

  // Setup the SpaceApi fixture
  spaceApi: async ({ request: _ }, use) => {
    const apiContext = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        'Authorization': CREDENTIALS.API_TOKEN || '',
        'Content-Type': 'application/json',
      },
    });
    await use(new SpaceApi(apiContext));
    await apiContext.dispose();
  },
  
  taskApi: async ({ request: _ }, use)=> {
    const apiContext = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        'Authorization': CREDENTIALS.API_TOKEN || '',
        'Content-Type': 'application/json',
      },
    });
    await use(new TaskApi(apiContext));
    await apiContext.dispose(); 
  }
});

export { expect } from '@playwright/test';
