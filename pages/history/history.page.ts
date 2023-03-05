import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "@pages/base.page";
import { AppointmentInfo } from "@pages/history/appointment-info.component";

export class HistoryPage extends BasePage {
    readonly path: string = 'history.php#history';

    constructor(page: Page) {
        super(page);
    }

    async getAppointmentByDate(date: string): AppointmentInfo {
        const appointmentInfo = new AppointmentInfo(this.page, date);
        return  appointmentInfo.getInfo();
    }
}