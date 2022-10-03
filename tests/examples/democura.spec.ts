import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
});


test('test', async ({ page }) => {
  await page.goto('/');
  await page.locator('#btn-make-appointment').click();
  await page.locator('select[name="facility"]').selectOption('Hongkong CURA Healthcare Center');
  await page.locator('input[name="hospital_readmission"]').check();
  await page.locator('text=Medicaid >> input[name="programs"]').check();
  await page.locator('[placeholder="dd\\/mm\\/yyyy"]').click();
  // Click text=27 >> nth=0
  await page.locator('text=27').first().click();
  await page.locator('textarea[name="comment"]').click();
  await page.locator('textarea[name="comment"]').fill('Hello');
  await page.locator('text=Book Appointment').click();

  await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/appointment.php#summary');
});

test('Failed test', async ({ page }) => {
  await page.goto('/');
  await page.locator('#btn-make-appointment').click();

  await expect(page).toHaveTitle('Dummy');
});