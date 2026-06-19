import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class ClubHeroComponent extends BaseComponent {
  private readonly clubTitle: Locator;
  private readonly clubCategory: Locator;
  private readonly messageManagerButton: Locator;
  private readonly reviewsCount: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.clubTitle = this.root.locator('.club-name');

    this.clubCategory = this.root.locator('.tags');

    this.messageManagerButton = this.root.getByRole('button', {
      name: 'Написати менеджеру',
    });

    this.reviewsCount = this.root.locator('.feedback');
  }

  async getClubTitle(): Promise<string> {
    return await this.clubTitle.innerText();
  }

  async getCategory(): Promise<string> {
    return await this.clubCategory.innerText();
  }

  async clickMessageManager(): Promise<void> {
    await this.messageManagerButton.click();
  }

  async getReviewsCount(): Promise<number> {
    const text = await this.reviewsCount.innerText();

    const match = text.match(/\d+/);

    return match ? Number(match[0]) : 0;
  }

  async isMessageManagerButtonVisible(): Promise<boolean> {
    return await this.messageManagerButton.isVisible();
  }
}
