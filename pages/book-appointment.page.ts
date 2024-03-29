import { BasePage } from '@pages/base.page';
import { Page, Locator } from '@playwright/test';
import { AppointmentFormModel } from '@models/appointment-form.model';
import { SummaryPage } from './summary.page';

export class BookAppointmentPage extends BasePage {
    readonly path: string = '#appointment';
    readonly bookAppointmentBtn: Locator;
    readonly hospitalReadmissionInput: Locator;
    readonly facilityDropdown: Locator;
    readonly calendar: Locator;
    readonly comment: Locator;
    readonly date: Locator;
    healthcareProgramCheckbox: Locator;

    constructor(page: Page) {
        super(page);
        this.bookAppointmentBtn = page.locator('button:has-text("Book Appointment")');
        this.hospitalReadmissionInput = page.locator('input[name="hospital_readmission"]');
        this.facilityDropdown = page.locator('select[name="facility"]');
        this.calendar = page.locator('[placeholder="dd\\/mm\\/yyyy"]');
        this.comment = page.locator('textarea[name="comment"]');
        this.date = (today) => page.locator(`xpath=//td[@class="day" and text()="${today}"]`);
    }

    async fill(model: Partial<AppointmentFormModel>) {
        await this.selectFacility(model.facility);
        await this.applyForHospitalReadmission(model.hospitalReadmission);
        await this.selectHealthcareProgram(model.healthcareProgram);
        await this.selectDate(model.visitDate);
        await this.comment.fill(model.comment);
        return model;
    }

    async selectFacility(facility: string) {
        await this.facilityDropdown.selectOption(facility);
    }

    async applyForHospitalReadmission(selection: boolean) {
        if (selection === true) {
            await this.hospitalReadmissionInput.check();
        }
    }

    async selectHealthcareProgram(program) {
        await this.page.locator(`input[type="Radio"][value=${program}]`).check();
    }

    async bookAppointment() {
        await Promise.all([
            this.bookAppointmentBtn.click(),
            this.waitForNetworkIdle(),
        ]);
        return new SummaryPage(this.page);
    }

    async selectDate(date: Date) {
        await this.calendar.click();
        const today = date.getDate();
        await this.date(today).first().click();
    }
}