import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class ClubDescriptionComponent extends BaseComponent {
  private readonly clubFullStars: Locator;
  private readonly clubHalfStars: Locator;
  private readonly reviewsLink: Locator;
  private readonly clubDescription: Locator;
  private readonly enrollButton: Locator;
  private readonly downloadButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.clubFullStars = this.root.locator('li.ant-rate-star-full');
    this.clubHalfStars = this.root.locator('li.ant-rate-star-half');
    this.reviewsLink = this.root.locator('.feedback');
    this.clubDescription = this.root.locator('div.content');
    this.enrollButton = this.root.locator('.apply-button');
    this.downloadButton = this.root.locator('.details-button');
  }

  async getRating(): Promise<number> {
    const fullStars = await this.clubFullStars.count();
    const halfStars = await this.clubHalfStars.count();

    if (fullStars === 0 && halfStars === 0) return 0;

    return fullStars + halfStars * 0.5;
  }

  async getReviewsCount(): Promise<number> {
    const text = await this.reviewsLink.innerText();
    const match = text.match(/\d+/);

    return match ? Number(match[0]) : 0;
  }

  async getDescription(): Promise<string> {
    return await this.clubDescription.innerText();
  }

  async clickEnroll(): Promise<void> {
    await this.enrollButton.click();
  }

  async clickDownload(): Promise<void> {
    await this.downloadButton.click();
  }

  async isEnrollButtonVisible(): Promise<boolean> {
    return await this.enrollButton.isVisible();
  }

  async isEnrollButtonEnabled(): Promise<boolean> {
    return await this.enrollButton.isEnabled();
  }

  async isDownloadButtonVisible(): Promise<boolean> {
    return await this.downloadButton.isVisible();
  }

  async isDownloadButtonEnabled(): Promise<boolean> {
    return await this.downloadButton.isEnabled();
  }
}
