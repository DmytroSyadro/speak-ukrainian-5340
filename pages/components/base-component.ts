import { Locator, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;

  constructor(page: Page, rootSelector: string) {
    this.page = page;
    this.root = page.locator(rootSelector);
  }
}
