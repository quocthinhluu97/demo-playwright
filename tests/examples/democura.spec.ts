import { test, expect, Page } from '@playwright/test';
import { CuraPage, Facilities, HealthcarePrograms } from '@pages/cura.page';

test.describe.serial('Serial test suite', () => {
  let curaPage: CuraPage;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    curaPage = new CuraPage(page);
  })

  test.beforeEach(async () => {
    await page.goto('/');
  });

  test('Book an appointment', async () => {
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
});
