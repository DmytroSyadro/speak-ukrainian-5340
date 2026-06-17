import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';
import { DropdownComponent } from './dropdown-component';
import { ClubCategory } from '@/data';

export class SearchBarComponent extends BaseComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly advancedSearchButton: Locator;
  private readonly searchFieldText: Locator;
  private readonly dropdownLocator: Locator;

  private dropdown: DropdownComponent;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.searchInput = this.root.locator('input.ant-select-selection-search-input');
    this.searchButton = this.root.locator("xpath=.//span[@aria-label='search']");
    this.advancedSearchButton = this.root.locator("xpath=.//*[@aria-label='search']");
    this.searchFieldText = this.root.locator(
      'xpath=.//span[@class="ant-select-selection-placeholder"]'
    );
    this.dropdownLocator = this.root
      .page()
      .locator(
        "xpath=//div[contains(@class, 'ant-select-dropdown') and not(contains(@class, 'hidden'))]"
      );
    this.dropdown = new DropdownComponent(this.dropdownLocator);
  }

  async fillSearchInput(text: string): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.fill(text);
  }
  async pressEnter(): Promise<void> {
    await this.searchInput.press('Enter');
  }

  async getSearchInputText(): Promise<string> {
    return ((await this.searchFieldText.textContent()) ?? '').trim();
  }
  async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
  }
  async clickAdvancedSearchButton(): Promise<void> {
    await this.advancedSearchButton.click();
  }
  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }
  async clickSearchInput(): Promise<DropdownComponent> {
    await this.searchInput.click();
    return new DropdownComponent(this.dropdownLocator);
  }
  async clickCategoryOption(category: ClubCategory): Promise<SearchBarComponent> {
    await this.searchInput.click();
    await this.dropdown.select(category);
    return this;
  }
  async clickClubOption(clubName: string): Promise<SearchBarComponent> {
    await this.searchInput.click();
    await this.dropdown.select(clubName);
    return this;
  }
}
