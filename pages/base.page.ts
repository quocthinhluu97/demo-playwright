import { Page } from "@playwright/test";
import { DataFile, EnvironmentUtils } from '@utils/environment.util';
import { Data } from '@data/data';
import { HeaderComponent } from '@pages/_layout/header.component';
import { FooterComponent } from '@pages/_layout/footer.component';

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
        const { baseUrl } = EnvironmentUtils.read<Data>(DataFile.TestData);
        await Promise.all([
            this.page.goto(baseUrl),
            this.waitForNetworkIdle(),
        ]);
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }
}