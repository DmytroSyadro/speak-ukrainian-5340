import { BaseComponent } from './base-component.js';
import { Locator, Page } from '@playwright/test';
import { TagsComponent } from './tags-component';

export class ClubCardComponent extends BaseComponent {
  private readonly moreDetailsButton: Locator;
  private readonly clubTitle: Locator;
  private readonly clubDescription: Locator;
  private readonly clubAddress: Locator;
  private readonly clubFullStars: Locator;
  private readonly clubHalfStars: Locator;
  private readonly clubOnline: Locator;

  private clubTags: TagsComponent;

  constructor(page: Page, rootSelector: Locator) {
    super(page, rootSelector);
    this.moreDetailsButton = this.root.locator('.//a[contains(@class, "ant-btn-default")]');
    this.clubAddress = this.root.locator('.oneAddress');
    this.clubDescription = this.root.locator('.description');
    this.clubFullStars = this.root.locator('li.ant-rate-star-full');
    this.clubHalfStars = this.root.locator('li.ant-rate-star-half');
    this.clubTitle = this.root.locator('.name');
    this.clubOnline = this.root.locator('.online');
    this.clubTags = new TagsComponent(
      this.page,
      this.root.locator('.//div[contains(@class, "club-tags") and not(contains(@class, "box"))]')
    );
  }
  async clickMoreDetailsButton(): Promise<void> {
    await this.moreDetailsButton.click();
  }
  async clickTitleButton(): Promise<void> {
    await this.clubTitle.click();
  }
  async getClubTitle(): Promise<string> {
    return this.clubTitle.innerText();
  }
  async getClubDescription(): Promise<string> {
    return this.clubDescription.innerText();
  }
  async getClubRating(): Promise<number> {
    const fullStars = await this.clubFullStars.count();
    const halfStars = await this.clubHalfStars.count();

    if (fullStars === 0 && halfStars === 0) return 0;

    return fullStars + halfStars * 0.5;
  }
  async getClubAddress(): Promise<string> {
    return this.clubAddress.innerText();
  }
  async isOnlineVisible(): Promise<boolean> {
    return this.clubOnline.isVisible();
  }
  async clickAddressButton(): Promise<void> {
    await this.clubAddress.click();
  }
  async hasRating(): Promise<boolean> {
    return (await this.getClubRating()) > 0;
  }
  async isTitleVisible(): Promise<boolean> {
    return this.clubTitle.isVisible();
  }
  async getMoreButtonHref(): Promise<string | null> {
    return this.moreDetailsButton.getAttribute('href');
  }
}
