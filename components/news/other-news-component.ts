import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { NewsCardComponent } from '@/components/news/news-card-component';

export class OtherNewsComponent extends BaseComponent {
  private readonly cards: Locator;
  private readonly activeCards: Locator;
  private readonly nextButton: Locator;
  private readonly prevButton: Locator;
  private readonly pagination: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.cards = this.root.locator('.carousel-item');
    this.activeCards = this.root.locator('.slick-active .carousel-item');
    this.prevButton = this.root.locator('[aria-label="arrow-left"]');
    this.nextButton = this.root.locator('div.news-carousel-block > span.anticon-arrow-right');
    this.pagination = this.root.locator('ul.slick-dots');
  }

  getCard(index: number): NewsCardComponent {
    return new NewsCardComponent(this.cards.nth(index));
  }

  getActiveCard(index: number): NewsCardComponent {
    return new NewsCardComponent(this.activeCards.nth(index));
  }

  async clickLeftArrow(): Promise<void> {
    await this.prevButton.click();
  }

  async clickRightArrow(): Promise<void> {
    await this.nextButton.click();
  }

  async getPaginationCount(): Promise<number> {
    return await this.pagination.locator('li').count();
  }

  async getVisibleCardsTitles(): Promise<string[]> {
    await this.activeCards.first().waitFor({ state: 'attached' });

    const titles: string[] = [];
    const count = await this.activeCards.count();

    for (let i = 0; i < count; i++) {
      const card = this.getActiveCard(i);
      titles.push(await card.getTitle());
    }

    return titles;
  }
}
