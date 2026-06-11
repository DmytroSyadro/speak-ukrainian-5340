// pages/about-us.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
// After implementing Header / Footer
// import { Header } from './components/header-component';
// import { Footer } from './components/footer-component';

export class AboutUsPage extends BasePage {
  // readonly header: Header;
  // readonly footer: Footer;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly initiativeTitle: Locator;
  readonly socialLinksBlock: Locator;
  readonly supportProjectButton: Locator;
  readonly initiativeDescription: Locator;
  readonly teamMemberNames: Locator;
  readonly teamMemberRoles: Locator;
  readonly videoFrame: Locator;
  readonly reviewsBlock: Locator;
  readonly allReviewsParagraphs: Locator;

  constructor(page: Page) {
    super(page);
    // this.header = new Header(page);
    // this.footer = new Footer(page);

    this.heroTitle = page.locator('.title .text');
    this.heroSubtitle = page.locator('.title .content');
    this.initiativeTitle = page.locator('.city-name');

    this.socialLinksBlock = page.locator('.social-info');
    this.supportProjectButton = page.locator('.help-button .donate-button');

    this.initiativeDescription = page.locator('.content-text').first();

    this.teamMemberNames = page.locator('.content .chapter');
    this.teamMemberRoles = page.locator('.content .highlight');

    this.videoFrame = page.locator('.video iframe');
    this.reviewsBlock = page.locator('.content-text').last();
    this.allReviewsParagraphs = this.reviewsBlock.locator('p');
  }

  async navigateToAboutPage(): Promise<void> {
    await this.page.goto('/about');
  }

  async getHeroTitle(): Promise<string> {
    return (await this.heroTitle.textContent()) || '';
  }

  async getHeroSubtitle(): Promise<string> {
    return (await this.heroSubtitle.textContent()) || '';
  }

  async getInitiativeTitle(): Promise<string> {
    return (await this.initiativeTitle.textContent()) || '';
  }

  async clickSupportProjectButton(): Promise<void> {
    await this.supportProjectButton.click();
  }

  async isSupportProjectButtonVisible(): Promise<boolean> {
    return await this.supportProjectButton.isVisible();
  }

  async getTeamMemberName(index: number): Promise<string> {
    return (await this.teamMemberNames.nth(index).textContent()) || '';
  }

  async getTeamMemberRole(index: number): Promise<string> {
    return (await this.teamMemberRoles.nth(index).textContent()) || '';
  }

  async getTeamMembersCount(): Promise<number> {
    return await this.teamMemberNames.count();
  }

  async getInitiativeDescription(): Promise<string> {
    return (await this.initiativeDescription.textContent()) || '';
  }

  async isVideoVisible(): Promise<boolean> {
    return await this.videoFrame.isVisible();
  }

  async getVideoSource(): Promise<string | null> {
    return await this.videoFrame.getAttribute('src');
  }

  async getReviewByIndex(index: number): Promise<string> {
    return (await this.allReviewsParagraphs.nth(index).textContent()) || '';
  }

  async getReviewsCount(): Promise<number> {
    return await this.allReviewsParagraphs.count();
  }

  async getAllReviews(): Promise<string[]> {
    return await this.allReviewsParagraphs.allTextContents();
  }

  async isReviewsSectionVisible(): Promise<boolean> {
    return await this.reviewsBlock.isVisible();
  }
}
