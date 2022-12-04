import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { Data } from "@data/data";
import { DataFile, EnvironmentUtils } from "@utils/environment.util";

async function globalSetup(config: FullConfig) {
  const { accounts } = EnvironmentUtils.read<Data>(DataFile.TestData);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.makeAppointment();

  const { username, password, storageState } = accounts[0];
  await loginPage.login(username, password);
  await page.context().storageState({ path: storageState });

  await browser.close();
}

export default globalSetup;