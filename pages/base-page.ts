import type { Page } from '@playwright/test';
import { HeaderComponent } from './components/header-component';
import { FooterComponent } from './components/footer-component';

export abstract class BasePage {
  protected page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  protected constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }
}
