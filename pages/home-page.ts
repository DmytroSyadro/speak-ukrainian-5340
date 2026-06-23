import { test, type Locator, type Page } from '@playwright/test';
import { ClubCategoryCardComponent } from '@/components/club/club-category-card-component';
import { BasePage } from '@/pages/base-page';

export class HomePage extends BasePage {
  private readonly initiativeText: Locator;
  private readonly allClubsButton: Locator;
  private readonly categoryCards: Locator;
  private readonly categoriesNextArrow: Locator;
  private readonly categoriesPrevArrow: Locator;
  private readonly categoriesDots: Locator;
  private readonly challengeLearnMoreButton: Locator;
  private readonly promoBanner: Locator;
  private readonly userProfileDropdown: Locator;
  private readonly loginMenuItem: Locator;

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
    this.categoriesDots = page.locator('.categories-cards .slick-dots');
    this.challengeLearnMoreButton = page.getByText('Дізнатись більше', { exact: true });
    this.promoBanner = page.locator('.banner-image');
    this.userProfileDropdown = page.locator('.user-profile');
    this.loginMenuItem = page.locator('.ant-dropdown-menu-item').filter({ hasText: 'Увійти' });
  }

  async goto(): Promise<void> {
    await test.step('Navigate to Home page', async () => {
      await this.navigateTo('/');
    });
  }

  async getInitiativeText(): Promise<string | null> {
    return await this.initiativeText.textContent();
  }

  async clickAllClubsButton(): Promise<void> {
    await test.step('Click "All Clubs" button', async () => {
      await this.allClubsButton.click();
    });
  }

  async getCategoryCardsCount(): Promise<number> {
    return await this.categoryCards.count();
  }

  async clickCategory(categoryName: string): Promise<void> {
    await test.step(`Click on category: "${categoryName}"`, async () => {
      await this.categoryCards.filter({ hasText: categoryName }).click();
    });
  }

  getCategoryCardComponentByName(categoryName: string): ClubCategoryCardComponent {
    const categoryCardLocator = this.categoryCards.filter({ hasText: categoryName });
    return new ClubCategoryCardComponent(categoryCardLocator);
  }

  async clickCategoriesNextArrow(): Promise<void> {
    await test.step('Click next arrow in categories carousel', async () => {
      await this.categoriesNextArrow.click();
    });
  }

  async clickCategoriesPrevArrow(): Promise<void> {
    await test.step('Click previous arrow in categories carousel', async () => {
      await this.categoriesPrevArrow.click();
    });
  }

  async clickCategoryDot(index: number): Promise<void> {
    await test.step(`Click on category dot at index: ${index}`, async () => {
      await this.categoriesDots.getByRole('button', { name: `${index}` }).click();
    });
  }

  async clickChallengeLearnMoreButton(): Promise<void> {
    await test.step('Click "Learn More" button for challenge', async () => {
      await this.challengeLearnMoreButton.click();
    });
  }

  async isPromoBannerVisible(): Promise<boolean> {
    return await test.step('Check if promo banner is visible', async () => {
      return await this.promoBanner.isVisible();
    });
  }

  async clickPromoBanner(): Promise<void> {
    await test.step('Click on promo banner', async () => {
      await this.promoBanner.click();
    });
  }

  async clickSignInButton(): Promise<void> {
    await test.step('Click sign-in button from user profile dropdown', async () => {
      await this.userProfileDropdown.click();

      await this.loginMenuItem.waitFor({
        state: 'visible',
      });

      await this.loginMenuItem.click();
    });
  }
}
