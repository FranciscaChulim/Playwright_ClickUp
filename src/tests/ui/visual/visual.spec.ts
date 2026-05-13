import { test, expect } from "@fixtures/fixture";
import { BasePage } from "@pages/base.page";  
import { URLS, WORKSPACE } from '@utils/constants';
import { description, tag, severity } from "allure-js-commons";

test.describe('Tests Visual, Styles and ARIA', () => {

  test.beforeEach(async ({ workspacePage }) => {
    await workspacePage.navigateTo(URLS.WORKSPACE);
    await workspacePage.pickerToggleBtn.waitFor({ state: 'visible' });
    await expect(workspacePage.pickerToggleBtn).toContainText(WORKSPACE.TITLE_NAME);
  });

  test('@smoke Home page visual validation', async ({ workspacePage }) => {
    await description("Verify the visual layout of the primary workspace page.");
    await tag("REQ-04");
    await severity("Minor");

    await expect(workspacePage.page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      mask: [workspacePage.pickerToggleBtn],
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('Validate specific Home page styles', async ({ workspacePage }) => {
    await description("Verify the styles, and ARIA structure of the primary workspace page.");
    await tag("REQ-04");
    await severity("Minor");

    await expect(workspacePage.pickerToggleBtn).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.06)');
    await expect(workspacePage.addTaskBtn).toHaveCSS('font-size', '12px');
  });

  test('Validate visual layout of the In Progress list', async ({ workspacePage }) => {
    await description("Verify the visual layout of the InProgress list.");
    await tag("REQ-04");
    await severity("Minor");

    await expect(workspacePage.inProgressList).toHaveScreenshot('inProgressList-container.png', {
      mask: [workspacePage.currentTime, workspacePage.sessionId],
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('Validate the ARIA layout of the Sidebar', async ({ page }) => {   
    await description("Verify the ARIA structure of the sidebar.");
    await tag("REQ-04");
    await severity("Minor");

    const basePage = new BasePage(page);
    await expect(basePage.sidebarCollapsedContainer).toMatchAriaSnapshot(`
    - navigation "Sidebar":
      - link "Home":
        - /url: https://app.clickup.com/90141200166/inbox
      - link /Planner \\d+/:
        - /url: https://app.clickup.com/90141200166/calendar
      - link "AI":
        - /url: https://app.clickup.com/90141200166/ai
      - link "Teams":
        - /url: https://app.clickup.com/90141200166/teams-pulse
      - button "Dropdown menu"
      - button "Invite"
      - button "Upgrade"
    `);
  });

  test('@smoke  Validate the ARIA layout of the Global sidebar', async ({ page }) => { 
    await description("Verify the ARIA structure of the Globar sidebar.");
    await tag("REQ-04");
    await severity("Minor");

    const basePage = new BasePage(page);
    await expect(basePage.globalSidebarContainer).toMatchAriaSnapshot(`
    - tree:
      - treeitem [level=1]
      - treeitem "Inbox" [level=1]:
        - link "Inbox"
      - treeitem "Replies" [level=1]:
        - link "Replies"
      - treeitem "Assigned Comments" [level=1]:
        - link "Assigned Comments"
      - treeitem "My Tasks" [level=2]:
        - link "My Tasks"
      - treeitem "More" [level=1]:
        - button "More"
      - treeitem [level=1]
      - treeitem "Favorites Dropdown menu" [level=1]:
        - button "Favorites"
        - button
        - button "Dropdown menu"
      - treeitem [level=1]
      - treeitem "Spaces Spaces settings" [expanded] [level=1]:
        - button "Spaces"
        - button "Spaces settings"
        - button
      - treeitem /All Tasks - .*'s Workspace/ [level=2]:
        - link /All Tasks - .*'s Workspace/
      - treeitem "Team Space, , Team Space" [expanded] [level=2]:
        - img
        - link "Team Space"
        - button
        - button
      - treeitem "Project 1 2" [level=3]:
        - button
        - link "Project 1"
      - treeitem "Project 2 1" [level=3]:
        - button
        - link "Project 2"
      - treeitem "Get Started with ClickUp 6" [level=3]:
        - button
        - link "Get Started with ClickUp"
      - treeitem "Team Docs" [level=3]:
        - link "Team Docs"
      - treeitem "My Space Test, , My Space Test" [level=2]:
        - link "My Space Test"
      - treeitem "New Space" [level=2]
      - treeitem [level=1]
      - treeitem "Channels" [expanded] [level=1]:
        - button "Channels"
        - button
        - button
      - treeitem /.*'s Workspace, , General - .*'s Workspace/ [level=2]:
        - link /General - .*'s Workspace/
      - treeitem "Welcome" [level=2]:
        - link "Welcome"
      - treeitem "Add Channel" [level=2]:
        - link "Add Channel"
      - treeitem [level=1]
      - treeitem "Direct Messages" [expanded] [level=1]:
        - button "Direct Messages"
        - button
        - button
      - treeitem /.*, , online .* — You/ [level=2]:
        - link /.* — You/
      - treeitem "New message" [level=2]:
        - link "New message"
      - treeitem [level=1]
      - treeitem [level=1]
    `);
  });
});
