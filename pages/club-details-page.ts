import type { Page } from '@playwright/test';

import { BasePage } from './base-page';
import { ClubHeroComponent } from './components/club-hero-component';
import { ClubDescriptionComponent } from './components/club-description-component';
import { ClubContactInfoComponent } from './components/club-contact-info-component';
import { CommentsSectionComponent } from './components/comments-section-component';
import { SimilarClubsComponent } from './components/similar-clubs-component';

export class ClubDetailsPage extends BasePage {
  private readonly clubPage: ReturnType<Page['locator']>;

  public readonly hero: ClubHeroComponent;
  public readonly description: ClubDescriptionComponent;
  public readonly contactInfo: ClubContactInfoComponent;
  public readonly comments: CommentsSectionComponent;
  public readonly similarClubs: SimilarClubsComponent;

  constructor(page: Page) {
    super(page);

    this.clubPage = this.page.locator('.club-page');

    this.hero = new ClubHeroComponent(this.page.locator('header.page-header'));
    this.description = new ClubDescriptionComponent(this.page.locator('main.page-content'));
    this.contactInfo = new ClubContactInfoComponent(
      this.page.locator('.ant-layout-sider-children')
    );
    this.comments = new CommentsSectionComponent(this.page.locator('main.page-comments'));
    this.similarClubs = new SimilarClubsComponent(this.page.locator('.similar-clubs'));
  }

  async navigateToClub(id: number): Promise<void> {
    await this.navigateTo(`/club/${id}`);
  }

  async getClubTitle(): Promise<string> {
    return await this.hero.getClubTitle();
  }

  async getClubDescription(): Promise<string> {
    return await this.description.getDescription();
  }

  async getClubRating(): Promise<number> {
    return await this.description.getRating();
  }

  async getClubAddress(): Promise<string> {
    return await this.contactInfo.getAddress();
  }

  async clickEnroll(): Promise<void> {
    await this.description.clickEnroll();
  }

  async clickDownload(): Promise<void> {
    await this.description.clickDownload();
  }

  async clickMessageManager(): Promise<void> {
    await this.hero.clickMessageManager();
  }

  async clickLeaveComment(): Promise<void> {
    await this.comments.clickLeaveComment();
  }

  async isClubDetailsDisplayed(): Promise<boolean> {
    return await this.clubPage.isVisible();
  }
}
