import { test, expect } from "@fixtures/fixture";
import { TASK_DETAILS } from "@utils/constants";
import { TitleGenerator } from "@utils/data-helper";  
import { description, tag, severity } from "allure-js-commons";

test.describe.configure({ mode: 'serial' });

test.describe("ClickUp API - Task Flow", () => {
  let createdTaskId: string;

  test("@smoke As a user, I want to create a new task", async ({ taskApi }) => {
    await description("Validate the Task CRUD using the API ");
    await tag("REQ-06");
    await severity("Major");

    const taskTitle = TitleGenerator.getToDoTaskTitle();
    const response = await taskApi.createTask(TASK_DETAILS.TASK_LIST_ID, taskTitle, TASK_DETAILS.API_DESCRIPTION, TASK_DETAILS.STATUS_TODO);
    expect(response.ok()).toBe(true);

    const body = await response.json();
    // Store for next tests
    createdTaskId = body.id;
    expect(body.name).toBe(taskTitle);
  });

  test("As a user, I want to retrieve the newly created task", async ({ taskApi }) => {
    await description("Validate the Task CRUD using the API ");
    await tag("REQ-06");
    await severity("Major");
    
    const response = await taskApi.getTask(createdTaskId);
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.id).toBe(createdTaskId);
  });

  test("As a user, I want to update the created task", async ({ taskApi }) => {
    const response = await taskApi.updateTask(createdTaskId , TASK_DETAILS.PRIORITY);
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.priority.id).toBe(TASK_DETAILS.PRIORITY); 
  });

  test("@smoke As a user, I want to delete the created task", async ({ taskApi }) => {
    const response = await taskApi.deleteTask(createdTaskId);
    expect(response.status()).toBe(204);

    const getResponse = await taskApi.getTask(createdTaskId);
    expect(getResponse.status()).toBe(404); // Expecting 404 Not Found after deletion
  });
});
