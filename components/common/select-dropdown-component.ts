import type { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class SelectDropdownComponent extends BaseComponent {
  private readonly options: Locator;

  static getRootLocator(page: Page): Locator {
    return page.locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden)');
  }

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.options = this.root.locator('.ant-select-item-option');
  }

  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }

  async selectOption(optionText: string): Promise<void> {
    const option = this.options.filter({ hasText: optionText });
    await option.scrollIntoViewIfNeeded();
    await option.click();
  }
}
