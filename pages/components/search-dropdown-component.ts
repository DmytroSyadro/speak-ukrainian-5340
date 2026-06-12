import { BaseComponent } from './base-component';
import type { Locator } from '@playwright/test';
import { ClubCategory } from '../../data/club-category';

export class SearchDropdownComponent extends BaseComponent {
  private readonly dropdownOptions: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.dropdownOptions = this.root.locator('.//*[@class="ant-select-item-option-content"]');
  }
  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }
  async isHidden(): Promise<boolean> {
    return await this.root.isHidden();
  }
  async getDropdownOptions(): Promise<string[]> {
    const count = await this.dropdownOptions.count();
    const options: string[] = [];
    for (let i = 0; i < count; i++) {
      options.push(await this.dropdownOptions.nth(i).innerText());
    }
    return options;
  }
  async getDropdownOptionByIndex(index: number): Promise<string> {
    return await this.dropdownOptions.nth(index).innerText();
  }
  async getDropdownOptionCount(): Promise<number> {
    return await this.dropdownOptions.count();
  }
  async getDropdownOptionText(text: string): Promise<string> {
    return await this.dropdownOptions.filter({ hasText: text }).innerText();
  }
  async clickCategoryOption(category: ClubCategory): Promise<void> {
    await this.dropdownOptions.filter({ hasText: category }).click();
  }
  async clickClubDropdownOption(option: string): Promise<void> {
    await this.dropdownOptions.filter({ hasText: option }).click();
  }
}
