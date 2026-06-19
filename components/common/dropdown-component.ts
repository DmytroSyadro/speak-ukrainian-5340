import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class DropdownComponent extends BaseComponent {
  private readonly dropdownOptions: Locator;
  private readonly dropdownMenuOptions: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.dropdownOptions = this.root.locator('.ant-select-item-option-content');
    this.dropdownMenuOptions = this.root.locator('span.ant-dropdown-menu-title-content');
  }
  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }
  async clickFirstOption(): Promise<void> {
    await this.dropdownOptions.first().click();
  }
  async getFirstOptionText(): Promise<string> {
    return await this.dropdownOptions.first().innerText();
  }
  async isHidden(): Promise<boolean> {
    return await this.root.isHidden();
  }
  async select(option: string): Promise<void> {
    await this.dropdownOptions.filter({ hasText: option }).click();
  }

  async selectMenuOption(option: string): Promise<void> {
    await this.dropdownMenuOptions.filter({ hasText: option }).click();
  }

  async getOptionsText(): Promise<string[]> {
    return await this.dropdownOptions.allInnerTexts();
  }
}
