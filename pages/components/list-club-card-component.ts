import { BaseComponent } from './base-component';
import { Locator, Page } from '@playwright/test';
import { ClubCardComponent } from './club-card-component';


export class ListClubCardComponent extends BaseComponent {
  private readonly cardItems: Locator;
  constructor(page: Page, rootSelector: Locator) {
    super(page, rootSelector);
    this.cardItems = this.root.locator(".//div[@class='ant-card-body']");
  }

  async getClubs(): Promise<ClubCardComponent[]> {
    const count = await this.cardItems.count();
    const clubCards: ClubCardComponent[] = [];
    for (let iii = 0; iii < count; iii++) {
      clubCards.push(new ClubCardComponent(this.page, this.cardItems.nth(iii)));
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
    return new ClubCardComponent(this.page, this.cardItems.nth(index));
  }

  async getClubCardCount(): Promise<number> {
    return this.cardItems.count();
  }
}
