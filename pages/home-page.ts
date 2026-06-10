import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private readonly initiativeText: Locator;
  private readonly allClubsButton: Locator;
  private readonly categoryCards: Locator;
  private readonly categoriesNextArrow: Locator;
  private readonly categoriesPrevArrow: Locator;
  private readonly challengeLearnMoreButton: Locator;
  private readonly promoBanner: Locator;

  constructor(page: Page) {
    super(page);

    this.initiativeText = page.locator('.city-name');
    this.allClubsButton = page.locator('div.categories-header > a > button.ant-btn');
    this.categoryCards = page.locator('.content');
    this.categoriesNextArrow = page.locator(
      'div.categories-carousel-block > span.anticon-arrow-right > svg'
    );
    this.categoriesPrevArrow = page.locator(
      'div.categories-carousel-block > span.anticon-arrow-left > svg'
    );
    this.challengeLearnMoreButton = page.getByText('Дізнатись більше', { exact: true });
    this.promoBanner = page.locator('.banner-image');
  }

  async getInitiativeText(): Promise<string | null> {
    return await this.initiativeText.textContent();
  }

  async clickAllClubsButton(): Promise<void> {
    await this.allClubsButton.click();
  }

  async getCategoryCardsCount(): Promise<number> {
    return await this.categoryCards.count();
  }

  async getCategory(categoryName: string): Promise<void> {
    await this.categoryCards.filter({ hasText: categoryName }).click();
  }

  async clickCategoriesNextArrow(): Promise<void> {
    await this.categoriesNextArrow.click();
  }

  async clickCategoriesPrevArrow(): Promise<void> {
    await this.categoriesPrevArrow.click();
  }

  async clickChallengeLearnMoreButton(): Promise<void> {
    await this.challengeLearnMoreButton.click();
  }

  async isPromoBannerVisible(): Promise<boolean> {
    return await this.promoBanner.isVisible();
  }

  async clickPromoBanner(): Promise<void> {
    await this.promoBanner.click();
  }
}
