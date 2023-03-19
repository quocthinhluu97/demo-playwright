import { test as base } from '@playwright/test';
import { LoginPage } from "@pages/login.page"
import { BookAppointmentPage } from '@pages/book-appointment.page';
import { SummaryPage } from '@pages/summary.page';
import { HistoryPage } from '@pages/history/history.page';

type BaseFixture = {
    loginPage: LoginPage;
    bookAppointmentPage: BookAppointmentPage;
    summaryPage: SummaryPage;
    historyPage: HistoryPage;
}

export const test = base.extend<BaseFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await use(loginPage);
    },

    bookAppointmentPage: async ({ page }, use) => {
        const bookAppPage = new BookAppointmentPage(page);
        await bookAppPage.navigate();
        await use(bookAppPage);
    },

    summaryPage: async ({ page }, use) => {
        const summaryPage = new SummaryPage(page);
        await summaryPage.navigate();
        await use(summaryPage);
    },

    historyPage: async ({ page }, use) => {
        const historyPage = new HistoryPage(page);
        await historyPage.navigate();
        await use(historyPage);
    },
});

export { expect } from '@playwright/test';