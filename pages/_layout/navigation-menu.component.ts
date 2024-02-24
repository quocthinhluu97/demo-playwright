import { Locator, Page } from "@playwright/test";

export class NavigationMenu {
    readonly page: Page;
    readonly toggleNavigationMenu: Locator;
    readonly btnGoToHomePage: Locator;
    readonly btnGoToLoginPage: Locator;
    readonly btnGoToHistoryPage: Locator;
    readonly btnLogout: Locator;
    readonly navSidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toggleNavigationMenu = page.locator('#menu-toggle');
        this.navSidebar = page.locator('#sidebar-wrapper');
        this.btnGoToHomePage = this.navSidebar.locator('a', { hasText:'Home' });
        this.btnGoToLoginPage = this.navSidebar.locator('a', { hasText: 'Login' });
        this.btnGoToHistoryPage = this.navSidebar.locator('a', { hasText: 'History' });
        this.btnLogout = this.navSidebar.locator('a', { hasText: 'Logout' });
    }

    async goToHomePage() {
        await this.toggleNavigationMenu.click();
        await this.btnGoToHomePage.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToLoginPage() {
        await this.toggleNavigationMenu.click();
        await this.btnGoToLoginPage.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToHistoryPage() {
        await this.toggleNavigationMenu.click();
        await this.btnGoToHistoryPage.click();
        await this.page.waitForLoadState('networkidle');
    }

    async logout() {
        await this.toggleNavigationMenu.click();
        await this.btnLogout.click();
        await this.page.waitForLoadState('networkidle');
    }
}