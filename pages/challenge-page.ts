import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SocialInfoComponent } from './components/social-info-component';
import { ChallengeTasksCarouselComponent } from './components/challenge-tasks-carousel-component';

export class ChallengePage extends BasePage {
  private readonly initiativeNameText: Locator;
  private readonly bannerTitle: Locator;
  private readonly challengeDescription: Locator;
  private readonly applyButton: Locator;
  private readonly registerButton: Locator;

  private socialInfoComponent: SocialInfoComponent | null = null;
  private tasksCarouselComponent: ChallengeTasksCarouselComponent | null = null;

  constructor(page: Page) {
    super(page);
    this.initiativeNameText = page.locator('h2.city-name');
    this.bannerTitle = page.locator('.banner span.title');
    this.challengeDescription = page.locator('.challenge-description');
    this.applyButton = page.locator('.apply-button');
    this.registerButton = page.locator('.details-button');
  }

  async goto(id: number): Promise<void> {
    await this.page.goto(`/challenges/${id}`);
  }

  getSocialInfoComponent(): SocialInfoComponent {
    if (!this.socialInfoComponent) {
      this.socialInfoComponent = new SocialInfoComponent(this.page, '.social-info');
    }
    return this.socialInfoComponent;
  }

  getTasksCarouselComponent(): ChallengeTasksCarouselComponent {
    if (!this.tasksCarouselComponent) {
      this.tasksCarouselComponent = new ChallengeTasksCarouselComponent(
        this.page,
        '.challenge-day-carousel'
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

  async isApplyButtonDisabled(): Promise<boolean> {
    return await this.applyButton.isDisabled();
  }

  async isRegisterButtonVisible(): Promise<boolean> {
    return await this.registerButton.isVisible();
  }
}
