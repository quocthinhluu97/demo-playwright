import { chromium } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { Account } from "@data/data";
import { EnvironmentUtils } from "@utils/environment.util";
import AppSettings from '@constants/app-settings.const';

async function globalSetup() {
  const accounts = EnvironmentUtils.read<Account>(AppSettings.ACCOUNTS);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.makeAppointment();

  const { username, password } = accounts[0];
  await loginPage.login(username, password);
  await page.context().storageState({ path: process.env.AUTH_FILE });

  await browser.close();
}

export default globalSetup;