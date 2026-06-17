import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';
import { ClubModal } from '@/modals/club-modal';
import { TagsComponent } from '@/components/tags-component';
import { ClubCardComponent } from '@/components/club-card-component';

export class ListClubCardComponent extends BaseComponent {
  private readonly cardItems: Locator;
  private readonly clubTagsLocator: Locator;

  private clubTags: TagsComponent;

  constructor(rootSelector: Locator) {
    super(rootSelector);
    this.cardItems = this.root.locator("xpath=.//div[@class='ant-card-body']");
    this.clubTagsLocator = this.root.locator(
      'xpath=.//div[contains(@class, "club-tags") and not(contains(@class, "box"))]'
    );
    this.clubTags = new TagsComponent(this.clubTagsLocator);
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
    const cardLocator = this.cardItems.filter({ hasText: title }).first();
    try {
      await cardLocator.waitFor({ state: 'visible', timeout: 10000 });
      return new ClubCardComponent(cardLocator);
    } catch {
      return undefined;
    }
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
    await clubCard.click();
    return new ClubModal(this.page);
  }
  async clickButtonDetailByName(title: string): Promise<void> {
    const clubCard: ClubCardComponent | undefined = await this.getClubCardByTitle(title);
    if (!clubCard) throw new Error(`Club with title "${title}" not found`);
    await clubCard.clickMoreDetailsButton();
  }
  async getClubTags(): Promise<TagsComponent> {
    return this.clubTags;
  }
}
