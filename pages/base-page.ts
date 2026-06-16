import type { BrowserContext, Locator, Page } from '@playwright/test';
import { SearchBarComponent } from './components/search-bar-component';

export abstract class BasePage {
  protected page: Page;
  protected context: BrowserContext;
  protected searchBar: SearchBarComponent;

  private readonly searchBarLocator: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.searchBarLocator = page.locator("xpath=//div[@class='search']");
    this.searchBar = new SearchBarComponent(this.searchBarLocator);
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
