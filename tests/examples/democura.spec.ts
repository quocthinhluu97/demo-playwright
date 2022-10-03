import { test, expect, Page } from '@playwright/test';
import { CuraPage, Facilities, HealthcarePrograms } from '@pages/CuraPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('Book an appointment', async ({ page }) => {
  const curaPage = new CuraPage(page);

  await curaPage.makeAppointment();

  await curaPage.selectFacility(Facilities.HONGKONG);

  await curaPage.selectFacility(Facilities.TOKYO);

  await curaPage.selectFacility(Facilities.SEOUL);

  await curaPage.applyForHospitalReadmission();

  await curaPage.selectHealthcareProgram(HealthcarePrograms.MEDICAID);

  await curaPage.selectHealthcareProgram(HealthcarePrograms.MEDICARE);

  await curaPage.selectHealthcareProgram(HealthcarePrograms.NONE);

  await page.locator('[placeholder="dd\\/mm\\/yyyy"]').click();

  await page.locator('text=27').first().click();

  await page.locator('textarea[name="comment"]').click();

  await page.locator('textarea[name="comment"]').fill('Hello');

  await curaPage.bookAppointment();

  await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/appointment.php#summary');
});

test('Failed test', async ({ page }) => {
  const curaPage = new CuraPage(page);

  await page.locator('#btn-make-appointment').click();

  await expect(page).toHaveTitle('Dummy');
});