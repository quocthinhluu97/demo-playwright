import { AppointmentFormModel } from '@models/appointment-form.model';

export class AppointmentInfo {
    readonly page: Page;
    readonly panelInfo: Locator;
    readonly paraFacility: Locator;
    readonly paraApplyForHospitalReadmission: Locator;
    readonly paraHealthcareProgram: Locator;
    readonly paraComment: Locator;
    
    constructor(page: Page, date: string) {
        this.page = page;
        this.panelInfo = page.locator('.panel-info');
        this.paraFacility = this.panelInfo.locator('#facility');
        this.paraApplyForHospitalReadmission = this.panelInfo.locator('#hospital_readmission');
        this.paraHealthcareProgram = this.panelInfo.locator('#program');
        this.paraComment = this.panelInfo.locator('#comment');
    }

    async getInfo() {
        const info: Partial<AppointmentFormModel> = {};

        info.facility = await this.paraFacility.innerText();
        info.hospitalReadmission = await this.paraApplyForHospitalReadmission.innerText();
        info.healthcareProgram = await this.paraHealthcareProgram.innerText();
        info.comment = await this.paraComment.innerText();

        return info;
    }
}