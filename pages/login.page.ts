import { BasePage } from '@pages/base.page';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    readonly path: string = 'profile.php#login';
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly makeAppointmentBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginBtn = page.locator('button:has-text("Login")');
        this.makeAppointmentBtn = page.locator('#btn-make-appointment');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await Promise.all([
            this.loginBtn.click(),
            this.waitForNetworkIdle(),
        ]);

        return this.page;
    }

    async makeAppointment() {
        await this.makeAppointmentBtn.click();
    }
}