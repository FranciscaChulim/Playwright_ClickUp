import { test, expect } from "@fixtures/fixture";
import { URLS, WORKSPACE, TASK_DETAILS } from "@utils/constants";
import { TitleGenerator } from "@utils/data-helper";
import { description, tag, severity } from "allure-js-commons";

test.describe("ClickUp UI - Tasks Flow", () => {
  let createdTaskId: string | null = null;

  test.beforeEach(async ({ workspacePage }) => {
    createdTaskId = null;
    await workspacePage.navigateTo(URLS.WORKSPACE);
    await workspacePage.pickerToggleBtn.waitFor({ state: 'visible' });
    await expect(workspacePage.pickerToggleBtn).toContainText(WORKSPACE.TITLE_NAME);
  });

  test.afterEach(async ({ taskApi }) => {
    if (createdTaskId) {
      await taskApi.deleteTask(createdTaskId);
    }
  });

  test("As a user, I want to add a new task to the To Do list", async ({ workspacePage }) => {
    await description("Add a new task to the To Do list and verify it appears in the list");
    await tag("REQ-02");
    await severity("Major");

    const taskTitle = TitleGenerator.getToDoTaskTitle();
    const currentTask = workspacePage.getTaskRow(taskTitle);

    await test.step("1. Create a new To Do task with a dynamic title", async () => {
      await workspacePage.addNewTask(TASK_DETAILS.STATUS_TODO,taskTitle,TASK_DETAILS.UI_DESCRIPTION);
    });
    
    await test.step("2. Getting the To Do task ID for cleanup", async () => {
      createdTaskId = await workspacePage.getTaskId(taskTitle);
    });

    await test.step("3. Verify that the task appears in the To Do list", async () => {
      await expect(currentTask).toContainText(taskTitle);
    });
  });

  test("@smoke As a user, I want to add a new task to the In Progress list", async ({ workspacePage }) => {
    await description("Add a new task to the In Progress list and verify it appears in the list");
    await tag("REQ-002");
    await severity("Major");

    const taskTitle = TitleGenerator.getInProgressTaskTitle();
    const currentTask = workspacePage.getTaskRow(taskTitle);

    await test.step("1. Create a new In Progress task with a dynamic title", async () => {
      await workspacePage.addNewTask(TASK_DETAILS.STATUS_IN_PROGRESS,taskTitle,TASK_DETAILS.UI_DESCRIPTION);
    });

    await test.step("2. Getting the In Progress task ID for cleanup", async () => {
      createdTaskId = await workspacePage.getTaskId(taskTitle);
    });

    await test.step("3. Verify that the task appears in the In Progress list", async () => {
      await expect(currentTask).toContainText(taskTitle);
    });
  });
});
