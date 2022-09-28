import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  // Go to https://katalon-demo-cura.herokuapp.com/
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  // Click text=Make Appointment
  await page.locator('text=Make Appointment').click();
  await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
  // Click input[name="username"]
  await page.locator('input[name="username"]').click();
  // Fill input[name="username"]
  await page.locator('input[name="username"]').fill('John Doe');
  // Press Tab
  await page.locator('input[name="username"]').press('Tab');
  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('ThisIsNotAPassword');
  // Click button:has-text("Login")
  await page.locator('button:has-text("Login")').click();
  await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/#appointment');
  // Select Hongkong CURA Healthcare Center
  await page.locator('select[name="facility"]').selectOption('Hongkong CURA Healthcare Center');
  // Check input[name="hospital_readmission"]
  await page.locator('input[name="hospital_readmission"]').check();
  // Check text=Medicaid >> input[name="programs"]
  await page.locator('text=Medicaid >> input[name="programs"]').check();
  // Click [placeholder="dd\/mm\/yyyy"]
  await page.locator('[placeholder="dd\\/mm\\/yyyy"]').click();
  // Click text=27 >> nth=0
  await page.locator('text=27').first().click();
  // Click textarea[name="comment"]
  await page.locator('textarea[name="comment"]').click();
  // Fill textarea[name="comment"]
  await page.locator('textarea[name="comment"]').fill('Hello');
  // Click text=Book Appointment
  await page.locator('text=Book Appointment').click();
  await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/appointment.php#summary');
});