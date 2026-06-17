import type { Locator, Page } from '@playwright/test';

export abstract class BaseModal {
  protected page: Page;
  protected root: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.root = this.getRoot() as unknown as Locator;
  }

  abstract getRoot(): Promise<Locator>;

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}
