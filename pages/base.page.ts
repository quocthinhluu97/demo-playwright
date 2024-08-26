import { Page } from "@playwright/test";
import { HeaderComponent } from '@pages/_layout/header.component';
import { FooterComponent } from '@pages/_layout/footer.component';
import AppSettings from "@constants/app-settings.const";

export abstract class BasePage {
    readonly page: Page;
    abstract readonly path: string;
    readonly sectionHeader: HeaderComponent;
    readonly sectionFooter: FooterComponent;

    constructor(page: Page) {
        this.page = page;
        this.sectionHeader = new HeaderComponent(page);
        this.sectionFooter = new FooterComponent(page);
    }

    async navigate() {
        const baseUrl = AppSettings.BASE_URL;
        await Promise.all([
            this.page.goto(baseUrl),
            this.waitForNetworkIdle(),
        ]);
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }
}