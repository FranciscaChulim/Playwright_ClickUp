import { test, expect } from "@fixtures/fixture";
import { URLS, WORKSPACE_TITLE, TASK_DETAILS, CREDENTIALS } from "@data/constants";
import { description, tag, severity } from "allure-js-commons";

test.describe("Add Tasks", () => {
    let createdTaskId: string | null = null;

    test.afterEach(async () => {
    await description("Delete the task created during the test to maintain a clean state");
    await tag("REQ-003");
    await severity("Critical");

    if (createdTaskId) {
      console.log(`Cleaning up task: ${createdTaskId}`);
      
      const response = await fetch(`https://api.clickup.com/api/v2/task/${createdTaskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': CREDENTIALS.API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`Cleanup failed for task ${createdTaskId}:`, await response.text());
      }
      createdTaskId = null;
    }
  });

  test("As a user, I want to add a new task to the To Do list", async ({ workspacePage }) => {
    await description("Add a new task to the To Do list and verify it appears in the list");
    await tag("REQ-02");
    await severity("HIGH");

    await workspacePage.navigateTo("/");
    await workspacePage.navigateTo(URLS.WORKSPACE);
    await expect(workspacePage.pickerToggleBtn).toContainText( WORKSPACE_TITLE.NAME );
    const currentTask = workspacePage.getTaskRow(TASK_DETAILS.TITLE);
    await workspacePage.addNewTask(TASK_DETAILS.STATUS[0], TASK_DETAILS.TITLE, TASK_DETAILS.DESCRIPTION);
    createdTaskId = await workspacePage.getTaskId(TASK_DETAILS.TITLE);
    console.log(`Created task with ID: ${createdTaskId}`);
    await expect(currentTask).toContainText(TASK_DETAILS.TITLE);
  });
  
  test("As a user, I want to add a new task to the In Progress list", async ({ page, workspacePage }) => {
    await description("Add a new task to the In Progress list and verify it appears in the list");
    await tag("REQ-002");
    await severity("HIGH");

    const currentTask = workspacePage.getTaskRow(TASK_DETAILS.TITLE);
    
    await test.step("1. Go to the workspace", async () => {
        await workspacePage.navigateTo("/");
        await workspacePage.navigateTo(URLS.WORKSPACE);
        await expect(workspacePage.pickerToggleBtn).toContainText( WORKSPACE_TITLE.NAME );
    });

    await test.step("2. Create a new task with a dynamic title", async () => {
        await workspacePage.addNewTask(TASK_DETAILS.STATUS[1], TASK_DETAILS.TITLE, TASK_DETAILS.DESCRIPTION);
    });

    await test.step("3. Getting the task ID for cleanup", async () => {
        createdTaskId = await workspacePage.getTaskId(TASK_DETAILS.TITLE);
        console.log(`Created task with ID: ${createdTaskId}`);
    });

    await test.step("4. Verify that the task appears in the InProgress list", async () => {
        await expect(currentTask).toContainText(TASK_DETAILS.TITLE);
    });
  });
}); 