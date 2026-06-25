import type { Page, Locator } from '@playwright/test';

import { BasePage } from './base-page';
import { ClubHeroComponent } from '@/components/club/club-hero-component';
import { ClubDescriptionComponent } from '@/components/club/club-description-component';
import { ClubContactInfoComponent } from '@/components/club/club-contact-info-component';
import { CommentsSectionComponent } from '@/components/comment/comments-section-component';
import { SimilarClubsComponent } from '@/components/club/similar-clubs-component';
import { NewsPage } from '@/pages/news-page';

export class ClubDetailsPage extends BasePage {
  private readonly clubPage: ReturnType<Page['locator']>;
  private readonly formErrors: ReturnType<Page['locator']>;
  private readonly notification: Locator;
  private readonly notificationText: Locator;
  private readonly authModal: ReturnType<Page['locator']>;
  private readonly authModalMessage: ReturnType<Page['locator']>;

  public readonly hero: ClubHeroComponent;
  public readonly description: ClubDescriptionComponent;
  public readonly contactInfo: ClubContactInfoComponent;
  public readonly comments: CommentsSectionComponent;
  public readonly similarClubs: SimilarClubsComponent;

  constructor(page: Page) {
    super(page);

    this.clubPage = this.page.locator('.club-page');
    this.formErrors = this.page.locator('.ant-form-item-explain-error');
    this.notification = this.page.locator('.ant-message');
    this.notificationText = this.page.getByText('Увійдіть або зареєструйтеся').first();
    this.authModal = this.page.locator('.ant-modal-content');
    this.authModalMessage = this.authModal.locator('.ant-modal-body');

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

  async scrollToCommentsSection(): Promise<void> {
    await this.comments.scrollIntoView();
  }

  async isClubDetailsDisplayed(): Promise<boolean> {
    return await this.clubPage.isVisible();
  }

  async getFormErrorCount(): Promise<number> {
    return this.formErrors.count();
  }

  async waitForClubPageVisible(): Promise<void> {
    await this.waitForVisible(this.clubPage);
  }

  async isNotificationVisible(): Promise<boolean> {
    return await this.notification.isVisible();
  }

  async getNotificationText(): Promise<string> {
    return (await this.notificationText.textContent()) || '';
  }

  async waitForNotification(): Promise<void> {
    await this.waitForVisible(this.notificationText);
  }

  async clearNotification(): Promise<void> {
    if (await this.notification.isVisible().catch(() => false)) {
      await this.notification.waitFor({ state: 'hidden', timeout: 5000 });
    }
  }

  async clickNews(): Promise<NewsPage> {
    await this.header.clickNews();
    return new NewsPage(this.page);
  }

  getAuthModalLocator(): ReturnType<Page['locator']> {
    return this.authModal;
  }

  getAuthModalMessageLocator(): ReturnType<Page['locator']> {
    return this.authModalMessage;
  }
}
