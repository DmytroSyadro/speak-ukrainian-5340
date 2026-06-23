import type { Locator, Page } from '@playwright/test';
import { SocialInfoComponent } from '@/components/social-info-component';
import { ChallengeTasksCarouselComponent } from '@/components/challenge/challenge-tasks-carousel-component';
import { BasePage } from '@/pages/base-page';
import { Challenges } from '@/data/challenges';

export class ChallengePage extends BasePage {
  private readonly initiativeNameText: Locator;
  private readonly bannerTitle: Locator;
  private readonly challengeDescription: Locator;
  private readonly applyButton: Locator;
  private readonly registerButton: Locator;
  private readonly helpButton: Locator;

  private socialInfoComponent: SocialInfoComponent | null = null;
  private tasksCarouselComponent: ChallengeTasksCarouselComponent | null = null;

  constructor(page: Page) {
    super(page);
    this.initiativeNameText = page.locator('h2.city-name');
    this.bannerTitle = page.locator('.banner span.title');
    this.challengeDescription = page.locator('.challenge-description');
    this.applyButton = page.locator('.apply-button');
    this.helpButton = page.locator('.help-button .donate-button');
    this.registerButton = page.locator('.details-button');
  }

  async goto(id: number): Promise<void> {
    await this.navigateTo(`/challenges/${id}`);
  }

  getSocialInfoComponent(): SocialInfoComponent {
    if (!this.socialInfoComponent) {
      this.socialInfoComponent = new SocialInfoComponent(this.page.locator('.social-info'));
    }
    return this.socialInfoComponent;
  }

  getTasksCarouselComponent(): ChallengeTasksCarouselComponent {
    if (!this.tasksCarouselComponent) {
      this.tasksCarouselComponent = new ChallengeTasksCarouselComponent(
        this.page.locator('.challenge-day-carousel')
      );
    }
    return this.tasksCarouselComponent;
  }

  async getInitiativeName(): Promise<string> {
    return (await this.initiativeNameText.innerText()).trim();
  }

  async getBannerTitle(): Promise<string> {
    return (await this.bannerTitle.innerText()).trim();
  }

  async getChallengeDescriptionText(): Promise<string> {
    return (await this.challengeDescription.innerText()).trim();
  }

  async getDescriptionLinks(): Promise<string[]> {
    const links = this.challengeDescription.locator('a');
    const count = await links.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  async clickApplyButton(): Promise<void> {
    await this.applyButton.click();
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }
  async selectChallenge(challenge: Challenges): Promise<ChallengePage> {
    await this.header.selectChallenge(challenge);
    return this;
  }

  async isApplyButtonDisabled(): Promise<boolean> {
    return await this.applyButton.isDisabled();
  }

  async isRegisterButtonVisible(): Promise<boolean> {
    return await this.registerButton.isVisible();
  }
  async clickHelpButton(): Promise<void> {
    await this.helpButton.waitFor({ state: 'visible' });
    await this.helpButton.click();
  }
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
