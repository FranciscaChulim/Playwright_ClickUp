/**
 * @Requirement: REQ-001 (User Authentication without session storage)
 * @Severity:    Critical
 * @Description: Verify that a user can login and reach the workspace.
 */
import { test, expect } from "@fixtures/fixture";
import { URLS, CREDENTIALS, DEFAULT_TIMEOUT } from "@data/constants";

test.describe("Login Flow", () => {
  test("User should login successfully with valid credentials", async ({ page, loginPage, workspacePage }) => {
    await loginPage.navigate();
    await loginPage.emailInputVisible();
    await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);
    await loginPage.waitForURL();
    await workspacePage.pickerToggleBtn.waitFor({state: "visible", timeout: DEFAULT_TIMEOUT });
   await expect(page).toHaveURL(new RegExp(URLS.WORKSPACE));
  });
});
