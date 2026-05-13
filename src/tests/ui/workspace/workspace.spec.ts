import { test, expect } from "@fixtures/fixture";
import { URLS, WORKSPACE } from "@utils/constants";
import { description, tag, severity } from "allure-js-commons";

test.describe("Login using Authenticated Session", () => {
  test("As an authenticated user, I should be able to view my workspace", async ({ workspacePage }) => {
    await description("Verify that a user can login and reach the workspace using Authentication with session storage");
    await tag("REQ-001");
    await severity("Critical");

    await workspacePage.navigateTo(URLS.WORKSPACE);
    await workspacePage.pickerToggleBtn.waitFor({ state: 'visible' });
    await expect(workspacePage.pickerToggleBtn).toContainText(WORKSPACE.TITLE_NAME);
  });
});
