import { test, expect } from "@fixtures/fixture";
import { URLS, CREDENTIALS, DEFAULT_TIMEOUT } from "@data/constants";

test.describe("Login Flow", () => {
  test("User should login successfully with valid credentials", async ({
    page,
    loginPage,
    workspacePage,
  }) => {
    await loginPage.navigate();
    await loginPage.loginEmailInput.waitFor({ state: "visible" });
    await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);
    await page.waitForURL("**/v/l/**", { timeout: 30000 });
    await workspacePage.pickerToggleBtn.waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    if (URLS.WORKSPACE) {
      await expect(page).toHaveURL(new RegExp(URLS.WORKSPACE));
    }
  });
});
