import type { BrowserContext, Page, Locator } from '@playwright/test';
import { HeaderComponent } from '@/components/common/header-component';
import { FooterComponent } from '@/components/common/footer-component';
import { SearchBarComponent } from '@/components/common/search-bar-component';

export abstract class BasePage {
  protected page: Page;
  protected context: BrowserContext;
  private readonly headerLocator: Locator;
  readonly header: HeaderComponent;
  private readonly footerLocator: Locator;
  readonly footer: FooterComponent;
  private readonly searchBarLocator: Locator;
  protected searchBar: SearchBarComponent;

  protected constructor(page: Page) {
    this.page = page;
    this.context = page.context();
    this.headerLocator = page.locator('header.header');
    this.header = new HeaderComponent(this.headerLocator);
    this.footerLocator = page.locator('footer.footer');
    this.footer = new FooterComponent(this.footerLocator);
    this.searchBarLocator = page.locator('div.search');
    this.searchBar = new SearchBarComponent(this.searchBarLocator);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
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
