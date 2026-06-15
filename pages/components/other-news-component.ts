import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';
import { NewsCardComponent } from './news-card-component';

export class OtherNewsComponent extends BaseComponent {
  private readonly cards: Locator;
  private readonly nextButton: Locator;
  private readonly prevButton: Locator;
  private readonly pagination: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.cards = this.root.locator('.carousel-item');
    this.prevButton = this.root.locator('[aria-label="arrow-left"]');
    this.nextButton = this.root.locator('[aria-label="arrow-right"]');
    this.pagination = this.root.locator('ul.slick-dots');
  }

  getCard(index: number): NewsCardComponent {
    return new NewsCardComponent(this.cards.nth(index));
  }

  async clickLeftArrow(): Promise<void> {
    await this.prevButton.click();
  }

  async clickRightArrow(): Promise<void> {
    await this.nextButton.click();
  }

  async getPaginationCount(): Promise<number> {
    return this.pagination.locator('li').count();
  }
}
