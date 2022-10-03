import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { CuraPage } from '@pages/CuraPage';

dotenv.config({
  path: '.env',
  override: true,
});

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL!);

  const curaPage = new CuraPage(page);

  await curaPage.makeAppointment();

  await curaPage.login(process.env.USERNAME as string, process.env.PASSWORD as string);

  await page.context().storageState({ path: storageState as string });

  await browser.close();
}

export default globalSetup;