import { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;

  protected constructor(page: Page, rootSelector: string | Locator) {
    this.page = page;
    this.root = typeof rootSelector === 'string' ? page.locator(rootSelector) : rootSelector;
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
  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }
}
