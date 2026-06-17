import type { BrowserContext, Locator, Page } from '@playwright/test';
import { SearchBarComponent } from '@/components/search-bar-component';
import { HeaderComponent } from '@/components/header-component';
import { FooterComponent } from '@/components/footer-component';
export abstract class BasePage {
  protected page: Page;
  protected context: BrowserContext;
  private readonly headerLocator: Locator;
  readonly header: HeaderComponent;
  private readonly footerLocator: Locator;
  readonly footer: FooterComponent;
  protected searchBar: SearchBarComponent;

  private readonly searchBarLocator: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.searchBarLocator = page.locator("xpath=//div[@class='search']");
    this.searchBar = new SearchBarComponent(this.searchBarLocator);
    this.headerLocator = page.locator('header.header');
    this.header = new HeaderComponent(this.headerLocator);
    this.footerLocator = page.locator('footer.footer');
    this.footer = new FooterComponent(this.footerLocator);
    this.context = page.context();
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
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
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
