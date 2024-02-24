import { Page, Locator } from '@playwright/test';

import { NavigationMenu } from '@pages/_layout/navigation-menu.component';

export class HeaderComponent {
    readonly page: Page;
    readonly btnMakeAppointment: Locator;
    readonly navigationMenu: NavigationMenu;

    constructor(page: Page) {
        this.page = page;
        this.btnMakeAppointment = page.locator('#btn-make-appointment');
        this.navigationMenu = new NavigationMenu(page);
    }

    async makeAppointment() {
        await this.btnMakeAppointment.click();
    }
}