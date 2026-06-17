import { BaseComponent } from '../base-component';
import type { Locator } from '@playwright/test';

export class DropdownComponent extends BaseComponent {
  private readonly dropdownOptions: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.dropdownOptions = this.root.locator(".//span[@class='ant-select-item-option-content']");
  }
  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }
  async isHidden(): Promise<boolean> {
    return await this.root.isHidden();
  }
  async select(option: string): Promise<void> {
    await this.dropdownOptions.filter({ hasText: option }).click();
  }

  async getOptionsText(): Promise<string[]> {
    return await this.dropdownOptions.allInnerTexts();
  }
}
