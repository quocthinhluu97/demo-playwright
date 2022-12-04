import { Page } from "@playwright/test";
import { DataFile, EnvironmentUtils } from '@utils/environment.util';
import { Data } from '@data/data';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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