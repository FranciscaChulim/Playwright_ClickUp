import { test, expect } from "@fixtures/fixture";
import { URLS, CREDENTIALS } from "@data/constants";
import { description, tag, severity } from "allure-js-commons";

test.describe("Login Flow", () => {
  test("User should login successfully with valid credentials", async ({ page, loginPage, workspacePage }) => {
    await description("Verify that a user can login and reach the workspace");
    await tag("REQ-001");
    await severity("Critical");

    await loginPage.navigateTo();
    expect(loginPage.waitForPageReady()).toBeTruthy();
    await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);
    expect(workspacePage.waitForPageReady()).toBeTruthy();
    await expect(page).toHaveURL(new RegExp(URLS.WORKSPACE));
  });
});
