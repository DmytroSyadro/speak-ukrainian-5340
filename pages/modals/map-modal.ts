import { BaseModal } from './base-modal';
import type { Locator, Page } from '@playwright/test';

export class MapModal extends BaseModal {
  private readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator("//div[@class='ant-modal-content']");
  }
  async getRoot(): Promise<Locator> {
    return this.root;
  }
}
