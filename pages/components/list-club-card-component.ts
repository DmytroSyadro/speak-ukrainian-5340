import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';
import { ClubCardComponent } from './club-card-component';

export class ListClubCardComponent extends BaseComponent {
  private readonly cardItems: Locator;

  constructor(rootSelector: Locator) {
    super(rootSelector);
    this.cardItems = this.root.locator(".//div[@class='ant-card-body']");
  }

  async getClubs(): Promise<ClubCardComponent[]> {
    const count = await this.cardItems.count();
    const clubCards: ClubCardComponent[] = [];
    for (let i = 0; i < count; i++) {
      clubCards.push(new ClubCardComponent(this.cardItems.nth(i)));
    }
    return clubCards;
  }

  async getClubCardByTitle(title: string): Promise<ClubCardComponent | undefined> {
    const clubCards: ClubCardComponent[] = await this.getClubs();
    for (const clubCard of clubCards) {
      if ((await clubCard.getClubTitle()) === title) {
        return clubCard;
      }
    }
    return undefined;
  }

  async getClubCardByIndex(index: number): Promise<ClubCardComponent> {
    return new ClubCardComponent(this.cardItems.nth(index));
  }

  async getClubCardCount(): Promise<number> {
    return this.cardItems.count();
  }
}
