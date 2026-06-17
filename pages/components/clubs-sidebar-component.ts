import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';
import { ClubCardComponent } from './club-card-component';

export class ClubsSidebarComponent extends BaseComponent {
  private readonly sidebarTitle: Locator;
  private readonly clubCardsLocator: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.sidebarTitle = this.root.locator('.city-name');
    this.clubCardsLocator = this.root.locator('.ant-card');
  }

  async getSidebarTitle(): Promise<string> {
    return await this.sidebarTitle.innerText();
  }

  async getClubCardsCount(): Promise<number> {
    return await this.clubCardsLocator.count();
  }

  getClubCardByIndex(index: number): ClubCardComponent {
    const specificCardLocator = this.clubCardsLocator.nth(index);
    return new ClubCardComponent(specificCardLocator);
  }
}
