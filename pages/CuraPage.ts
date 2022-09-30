import { Locator, Page } from '@playwright/test';

export class CuraPage {
    readonly page: Page;
    readonly makeAppointmentBtn: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.makeAppointmentBtn = page.locator('text=Make Appointment');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginBtn = page.locator('button:has-text("Login")');
    }

    async makeAppointment() {
        await this.makeAppointmentBtn.click();
    }

    async login(username, password) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.page.keyboard.press('Tab');
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}