import { AppointmentFormModel } from '@models/appointment-form.model';
import { Locator, Page } from '@playwright/test';

export class AppointmentInfo {
    readonly page: Page;
    readonly panelInfo: Locator;
    readonly paraFacility: Locator;
    readonly paraApplyForHospitalReadmission: Locator;
    readonly paraHealthcareProgram: Locator;
    readonly paraComment: Locator;
    readonly date: string;
    
    constructor(page: Page, date: string) {
        this.page = page;
        this.panelInfo = page.locator('.panel-info').filter({ has: page.locator(`.panel-heading:has-text("${date}")`)});
        this.paraFacility = this.panelInfo.locator('#facility');
        this.paraApplyForHospitalReadmission = this.panelInfo.locator('#hospital_readmission');
        this.paraHealthcareProgram = this.panelInfo.locator('#program');
        this.paraComment = this.panelInfo.locator('#comment');
        this.date = date;
    }

    async getInfo() {
        const info: AppointmentFormModel = {
            facility: await this.paraFacility.innerText(),
            hospitalReadmission: await this.paraApplyForHospitalReadmission.innerText(),
            healthcareProgram: await this.paraHealthcareProgram.innerText(),
            comment: await this.paraComment.innerText(),
            visitDate: this.date,
        };

        return info;
    }
}