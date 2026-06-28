import { expect, type Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import * as allure from 'allure-js-commons';

export class SearchBarComponent extends BaseComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly advancedSearchButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.searchInput = this.root.locator('.ant-select-selection-search-input, .search-input');
    this.searchButton = this.root.locator('svg[data-icon="search"]');
    this.advancedSearchButton = this.root.locator('svg[data-icon="control"]');
  }

  async clickAdvancedSearch(): Promise<void> {
    await allure.step('Click advanced search button', async (): Promise<void> => {
      await this.advancedSearchButton.click();
    });
  }

  async fillSearchInput(text: string): Promise<void> {
    await allure.step(`Fill search input with "${text}"`, async (): Promise<void> => {
      await this.searchInput.fill(text);
      await this.searchInput.press('Tab');
    });
  }

  async clickSearchButton(): Promise<void> {
    await allure.step('Click search button', async (): Promise<void> => {
      await expect(this.searchButton).toBeEnabled();
      await this.searchButton.click();
    });
  }

  async search(text: string): Promise<void> {
    await allure.step(`Search for "${text}"`, async (): Promise<void> => {
      await this.fillSearchInput(text);
      await this.clickSearchButton();
    });
  }

  async isSearchVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async getSearchInputValue(): Promise<string> {
    return (await this.searchInput.inputValue()) || '';
  }
}
