import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class NewsCardComponent extends BaseComponent {
  readonly title: Locator;
  readonly date: Locator;
  readonly detailsButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.title = rootLocator.locator('#newsTitle');
    this.date = rootLocator.locator('#newsDate');
    this.detailsButton = rootLocator.locator('#detailButton a');
  }

  async getNewsTitle(): Promise<string | null> {
    return this.title.textContent();
  }

  async getNewsDate(): Promise<string | null> {
    return this.date.textContent();
  }

  async clickDetailsButton(): Promise<void> {
    await this.detailsButton.click();
  }
  
}
