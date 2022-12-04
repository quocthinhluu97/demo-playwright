import { test as base } from '@playwright/test';
import { LoginPage } from "@pages/login.page"
import { BookAppointmentPage } from '@pages/book-appointment.page';

type BaseFixture = {
    loginPage: LoginPage;
    bookAppointmentPage: BookAppointmentPage;
}

export const test = base.extend<BaseFixture>({
    loginPage: async ({ page }, use) => {
        const pgLogin = new LoginPage(page);
        await pgLogin.navigate();
        await use(pgLogin);
    },

    bookAppointmentPage: async ({ page }, use) => {
        const bookAppPage = new BookAppointmentPage(page);
        await bookAppPage.navigate();
        await use(bookAppPage);
    },
});

export { expect } from '@playwright/test';