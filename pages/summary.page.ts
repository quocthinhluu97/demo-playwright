import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class SummaryPage extends BasePage {
    readonly summarySection: Locator;

    constructor(page: Page) {
        super(page);
        this.summarySection = page.locator('#summary');
    }

    async verifyAppointmentConfirmed() {
        await expect(this.summarySection).toHaveText(/Appointment Confirmation/);
    }
}