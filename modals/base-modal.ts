import type { Locator, Page } from '@playwright/test';

export abstract class BaseModal {
  protected page: Page;
  protected root: Locator;

  protected constructor(page: Page, rootLocator: Locator) {
    this.page = page;
    this.root = rootLocator;
  }

  async getRoot(): Promise<Locator> {
    return this.root;
  }

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }
}
