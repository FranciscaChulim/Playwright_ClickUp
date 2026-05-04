import { test as setup } from "@fixtures/fixture";
import { CREDENTIALS } from "@data/constants";
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
    console.log('auth.json exists, validating session...');

    const stats = fs.statSync(authFile);
    const hoursOld = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

    if (hoursOld < 24) {
      console.log('✅ auth.json is fresh (less than 24h old), skipping validation.');
      return;
    }
  }

  console.log("Creating new auth.json ...");
  await loginPage.navigate();
  await loginPage.emailInputVisible();
  await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);
  await workspacePage.pickerToggleBtnVisible();
  await page.waitForTimeout(5000); 
  // Save the authenticated state to a file
  await page.context().storageState({ path: authFile });
  console.log("✅ auth.json created successfully.");
});
