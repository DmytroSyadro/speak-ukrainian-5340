import type { BrowserContext, Page } from '@playwright/test';
import { HeaderComponent } from './components/header-component';
import { FooterComponent } from './components/footer-component';

export abstract class BasePage {
  protected page: Page;
  protected context: BrowserContext;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  protected constructor(page: Page) {
    this.page = page;
    this.context = page.context();
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

  async switchToNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([this.context.waitForEvent('page')]);
    await newPage.waitForLoadState();
    return newPage;
  }
  async getAllPage(): Promise<Page[]> {
    return this.context.pages();
  }
  async switchToTabByIndex(index: number): Promise<Page> {
    const pages = this.context.pages();
    await pages[index].bringToFront();
    return pages[index];
  }
  async closeCurrentTab(): Promise<void> {
    await this.page.close();
  }
}
