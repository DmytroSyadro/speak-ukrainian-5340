import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class NewsCardComponent extends BaseComponent {
  private readonly detailsButton: Locator;
  private readonly date: Locator;
  private readonly title: Locator;
  private readonly image: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.detailsButton = this.root.getByRole('link', { name: 'Детальніше' });
    this.date = this.root.locator('#newsDate');
    this.title = this.root.locator('#newsTitle');
    this.image = this.root.locator('#newsImage');
  }

  async clickDetailsButton(): Promise<void> {
    await this.detailsButton.click();
  }

  async getDate(): Promise<string> {
    return this.date.innerText();
  }

  async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  async getImageStyle(): Promise<string | null> {
    return await this.image.getAttribute('style');
  }

  async clickCard(): Promise<void> {
    await this.root.click();
  }
}
