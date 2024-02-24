import { Page, Locator } from '@playwright/test';
export class FooterComponent {
    readonly page: Page;
    readonly textCopyright: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textCopyright = page.locator('text-muted');
    }

    get copyright() {
        return this.textCopyright.textContent();
    }
}