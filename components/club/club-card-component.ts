import type { Locator } from '@playwright/test';

import { ClubModal } from '@/modals/club-modal';
import { BaseComponent } from '@/components/base-component';
import { ClubDetailsPage } from '@/pages';
import { TagsComponent } from '@/components/common/tags-component';

export class ClubCardComponent extends BaseComponent {
  private readonly moreDetailsButton: Locator;
  private readonly clubTitle: Locator;
  private readonly clubDescription: Locator;
  private readonly clubAddress: Locator;
  private readonly clubFullStars: Locator;
  private readonly clubHalfStars: Locator;
  private readonly clubOnline: Locator;
  private readonly ratingField: Locator;
  private readonly clubTagsLocator: Locator;
  private clubTags: TagsComponent;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.moreDetailsButton = this.root.locator('xpath=.//a[contains(@class, "ant-btn-default")]');
    this.clubAddress = this.root.locator('.oneAddress');
    this.clubDescription = this.root.locator('.description');
    this.clubFullStars = this.root.locator('li.ant-rate-star-full');
    this.clubHalfStars = this.root.locator('li.ant-rate-star-half');
    this.clubTitle = this.root.locator('div.name'); //
    this.clubOnline = this.root.locator('.club-online');
    this.ratingField = this.root.locator('ul.rating');
    this.clubTitle = this.root.locator('div.name');
    this.clubTagsLocator = this.root.locator(
      'xpath=.//div[contains(@class, "club-tags") and not(contains(@class, "box"))]'
    );
    this.clubTags = new TagsComponent(this.clubTagsLocator);
  }
  async clickMoreDetailsButton(): Promise<ClubDetailsPage> {
    await this.moreDetailsButton.click();
    return new ClubDetailsPage(this.page);
  }
  async clickTitleButton(): Promise<ClubModal> {
    await this.clubTitle.click();
    return new ClubModal(this.page);
  }
  async isClubAddressVisible(): Promise<boolean> {
    return this.clubAddress.isVisible();
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
  async isRatingVisible(): Promise<boolean> {
    return this.ratingField.isVisible();
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
