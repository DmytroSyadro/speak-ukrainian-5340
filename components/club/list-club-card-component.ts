import type { Locator } from '@playwright/test';
import { ClubModal } from '@/modals/club-modal';
import { BaseComponent } from '@/components/base-component';
import { ClubCardComponent } from '@/components/club/club-card-component';

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
  async clickClubCardByTitle(title: string): Promise<ClubModal> {
    const clubCard: ClubCardComponent | undefined = await this.getClubCardByTitle(title);
    if (!clubCard) throw new Error(`Club with title "${title}" not found`);
    await clubCard.clickTitleButton();
    return new ClubModal(this.page);
  }
  async clickButtonDetailByName(title: string): Promise<void> {
    const clubCard: ClubCardComponent | undefined = await this.getClubCardByTitle(title);
    if (!clubCard) throw new Error(`Club with title "${title}" not found`);
    await clubCard.clickMoreDetailsButton();
  }
}
