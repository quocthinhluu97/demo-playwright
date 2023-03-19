import { Page } from "@playwright/test";
import { BasePage } from "@pages/base.page";
import { AppointmentInfo } from "@pages/history/appointment-info.component";
import { AppointmentFormModel } from "@models/appointment-form.model";

export class HistoryPage extends BasePage {
    readonly path: string = 'history.php#history';

    constructor(page: Page) {
        super(page);
    }

    async getAppointmentByDate(date: string): Promise<AppointmentFormModel> {
        const appointmentInfo = new AppointmentInfo(this.page, date);
        return appointmentInfo.getInfo();
    }
}