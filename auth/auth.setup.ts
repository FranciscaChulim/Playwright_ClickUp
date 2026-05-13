import { test as setup, expect } from "@fixtures/fixture";
import { CREDENTIALS, WORKSPACE } from "@utils/constants";
import path from "path";
import fs from "fs";

const authDir = path.resolve(process.cwd(), "auth");
const authFile = path.join(authDir, "auth.json");

setup("Authenticate session", async ({ page, loginPage, workspacePage }) => {
  // Ensure the directory exists first
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  // Check if directory exists, if not, create it
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const hoursOld = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
    if (hoursOld < 8) {
      console.log('✅ auth.json exists, has less than 8h old, skipping validation.');
      return;
    }
    fs.unlinkSync(authFile);
  }

  console.log("Creating new auth.json ...");
  await loginPage.navigateTo();
  expect(loginPage.waitForPageReady()).toBeTruthy();
  await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);
  await expect(workspacePage.pickerToggleBtn).toContainText( WORKSPACE.TITLE_NAME );
  await page.context().storageState({ path: authFile });
  console.log('✅ auth.json created ...');
});
