import type { Locator } from '@playwright/test';

import { BaseComponent } from '../base-component';
import { NewsCardComponent } from './news-card-component';

export class NewsCardListComponent extends BaseComponent {
  private readonly cardItemsLocator: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.cardItemsLocator = this.root.locator('#newsContainer');
  }

  async getNewsCount(): Promise<number> {
    return await this.cardItemsLocator.count();
  }

  getNewsByIndex(index: number): NewsCardComponent {
    return new NewsCardComponent(this.cardItemsLocator.nth(index));
  }

  getCardByTitle(title: string): NewsCardComponent {
    return new NewsCardComponent(this.cardItemsLocator.filter({ hasText: title }));
  }

  async getAllCards(): Promise<NewsCardComponent[]> {
    const count = await this.getNewsCount();
    const cards: NewsCardComponent[] = [];

    for (let i = 0; i < count; i++) {
      cards.push(this.getNewsByIndex(i));
    }

    return cards;
  }
}
