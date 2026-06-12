import type { Locator, Page } from '@playwright/test';
import { SearchBarComponent } from './components/search-bar-component';

export abstract class BasePage {
  protected page: Page;
  protected searchBar: SearchBarComponent;

  private readonly searchBarLocator: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.searchBarLocator = page.locator("//div[@class='search']");
    this.searchBar = new SearchBarComponent(this.searchBarLocator);
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
