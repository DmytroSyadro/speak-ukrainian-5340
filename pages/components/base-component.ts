import { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;

  protected constructor(page: Page, rootSelector: string | Locator) {
    this.page = page;
    this.root = typeof rootSelector === 'string' ? page.locator(rootSelector) : rootSelector;
  }
}
