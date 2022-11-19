import { Locator, Page } from '@playwright/test';

export enum Facilities {
    TOKYO = "Tokyo CURA Healthcare Center",
    HONGKONG = "Hongkong CURA Healthcare Center",
    SEOUL = "Seoul CURA Healthcare Center",
}

export enum HealthcarePrograms {
    MEDICARE = "Medicare",
    MEDICAID = "Medicaid",
    NONE = "None",
}

export class CuraPage {
    readonly page: Page;
    readonly makeAppointmentBtn: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly bookAppointmentBtn: Locator;
    facility: string;
    hospitalReadmission: boolean;
    healthcareProgram: string;
    visitDate: Date;

    constructor(page: Page) {
        this.page = page;
        this.makeAppointmentBtn = page.locator('#btn-make-appointment');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginBtn = page.locator('button:has-text("Login")');
        this.bookAppointmentBtn = page.locator('button:has-text("Book Appointment")');
    }

    async selectFacility(facility: string) {
        await this.page.locator('select[name="facility"]').selectOption(facility);
        this.facility = facility;
    }

    async applyForHospitalReadmission() {
        await this.page.locator('input[name="hospital_readmission"]').check();
        this.hospitalReadmission = true;
    }

    async selectHealthcareProgram(program) {
        await this.page.locator(`input[type="Radio"][value=${program}]`).check();
        this.healthcareProgram = program;
    }

    async makeAppointment() {
        await this.makeAppointmentBtn.click();
    }

    async bookAppointment() {
        await this.bookAppointmentBtn.click();
    }

    async login(username, password) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.page.keyboard.press('Tab');
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}