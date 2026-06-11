import { Locator, Page } from '@playwright/test';

export abstract class BaseModal {
  protected page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  abstract getRoot(): Promise<Locator>;

  async isVisible(): Promise<boolean> {
    return (await this.getRoot()).isVisible();
  }


}