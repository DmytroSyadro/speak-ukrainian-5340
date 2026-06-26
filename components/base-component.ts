import type { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;

  protected constructor(rootLocator: Locator, page?: Page) {
    this.page = page ?? rootLocator.page();
    this.root = rootLocator;
  }

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
  async isHidden(): Promise<boolean> {
    return this.root.isHidden();
  }
  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForLocatorVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }
  async click(): Promise<void> {
    await this.root.click();
  }
}
