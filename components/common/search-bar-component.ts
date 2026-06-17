import type { Locator } from '@playwright/test';
import { ClubCategory } from '@/data';
import { BaseComponent } from '@/components/base-component';
import { DropdownComponent } from '@/components/common/dropdown-component';

export class SearchBarComponent extends BaseComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly advancedSearchButton: Locator;
  private readonly searchFieldText: Locator;
  private readonly dropdownLocator: Locator;

  private dropdown: DropdownComponent;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.searchInput = this.root.locator(".//*[@type='search']");
    this.searchButton = this.root.locator(".//span[@aria-label='search']");
    this.advancedSearchButton = this.root.locator(".//*[@aria-label='search']");
    this.searchFieldText = this.root.locator('.//span[@class="ant-select-selection-placeholder"]');
    this.dropdownLocator = this.root
      .page()
      .locator(
        "//div[contains(@class, 'ant-select-dropdown') and not(contains(@class, 'hidden'))]"
      );
    this.dropdown = new DropdownComponent(this.dropdownLocator);
  }

  async fillSearchInput(text: string): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.pressSequentially(text, { delay: 100 });
  }

  async getSearchInputText(): Promise<string> {
    return await this.searchFieldText.inputValue();
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
