import { test as setup, expect } from "@fixtures/fixture";
import { CREDENTIALS, DEFAULT_TIMEOUT, URLS } from "@data/constants";
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
  await loginPage.loginEmailInput.waitFor({ state: 'visible'});
  await loginPage.login(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD);

  await page.waitForURL('**/v/l/**', { timeout: 30000 }); 

  // 2. Now wait for the heavy UI element to appear
  try {
    await workspacePage.pickerToggleBtn.waitFor({ 
        state: 'visible', 
        timeout: DEFAULT_TIMEOUT 
    });
  } catch (e) {
    // If it fails, take a screenshot to see what went wrong
    await page.screenshot({ path: 'auth-failure.png' });
    throw e;
  }
  await page.waitForTimeout(5000); 
  // Save the authenticated state to a file
  await page.context().storageState({ path: authFile });
  console.log("✅ auth.json created successfully.");
});
