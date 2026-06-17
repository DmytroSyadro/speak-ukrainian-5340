import { BaseComponent } from '../base-component';
import type { Locator } from '@playwright/test';
import { ClubItemComponent } from './club-item-component';
import { ClubInfoPopupComponent } from './club-info-popup-component';

export class ClubItemListComponent extends BaseComponent {
  private readonly clubItems: Locator;
  private readonly clubInfoPopupLocator: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.clubItems = this.root.locator('div.club-item');
    this.clubInfoPopupLocator = this.root.locator('[role="dialog"].gm-style-iw');
  }

  async getAllClubItems(): Promise<string[]> {
    const clubItems = await this.clubItems.count();
    const clubItemTexts: string[] = [];
    for (let i = 0; i < clubItems; i++) {
      clubItemTexts.push(await this.clubItems.nth(i).innerText());
    }
    return clubItemTexts;
  }
  async getClubByTitle(title: string): Promise<ClubItemComponent> {
    const item = this.clubItems.filter({ hasText: title });
    return new ClubItemComponent(item.first());
  }
  async getClubItemByIndex(index: number): Promise<ClubItemComponent> {
    return new ClubItemComponent(this.clubItems.nth(index));
  }
  async getClubItemCount(): Promise<number> {
    return this.clubItems.count();
  }
  async isClubItemVisible(): Promise<boolean> {
    return this.clubItems.isVisible();
  }
  async clickClubItem(title: string): Promise<ClubInfoPopupComponent> {
    const item: ClubItemComponent = await this.getClubByTitle(title);
    if (!item) throw new Error(`Club with title "${title}" not found`);
    await item.click();
    return new ClubInfoPopupComponent(this.clubInfoPopupLocator);
  }
}
