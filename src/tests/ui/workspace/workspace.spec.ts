import { test, expect } from "@fixtures/fixture";
import { URLS,DEFAULT_TIMEOUT, WORKSPACE_TITLE } from "@data/constants";

test.describe("Login using Authenticated Session", () => {

  test("As an authenticated user, I should be able to view my workspace", async ({ workspacePage }) => {
    await workspacePage.goto('/')
    await workspacePage.goto(URLS.WORKSPACE);
    const workspacePicker = workspacePage.pickerToggleBtn;
    await workspacePicker.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    
    await expect(workspacePage.pickerToggleBtn).toContainText(WORKSPACE_TITLE.NAME);
  });
});
