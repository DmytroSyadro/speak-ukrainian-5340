import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class SimilarClubsComponent extends BaseComponent {
  private readonly title: Locator;
  private readonly clubCards: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.title = this.root.locator('.label');
    this.clubCards = this.root.locator('.club-card');
  }

  async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  async getSimilarClubsCount(): Promise<number> {
    return await this.clubCards.count();
  }

  async openClubByIndex(index: number): Promise<void> {
    await this.clubCards.nth(index).click();
  }

  async isSimilarClubsDisplayed(): Promise<boolean> {
    return await this.root.isVisible();
  }
}
