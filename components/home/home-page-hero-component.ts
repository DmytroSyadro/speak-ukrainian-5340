import { test, type Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class HomePageHeroComponent extends BaseComponent {
  private heroTitle: Locator;
  private heroDescription: Locator;
  private heroLearnMoreButton: Locator;
  private heroCarouselNextArrow: Locator;
  private heroCarouselPrevArrow: Locator;
  private heroCarouselDots: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.heroTitle = this.root.locator('.slick-active .label');
    this.heroDescription = this.root.locator('.slick-active .description');
    this.heroLearnMoreButton = this.root.getByRole('button', { name: 'Детальніше' });
    this.heroCarouselNextArrow = this.root.locator('.anticon-arrow-right > svg');
    this.heroCarouselPrevArrow = this.root.locator('.anticon-arrow-left > svg');
    this.heroCarouselDots = this.root.locator('.slick-dots');
  }

  async getHeroTitle(): Promise<string | null> {
    return await this.heroTitle.textContent();
  }

  async getHeroDescription(): Promise<string | null> {
    return await this.heroDescription.textContent();
  }

  async clickHeroLearnMoreButton(): Promise<void> {
    await test.step('Click "Learn More" button on hero section', async () => {
      await this.heroLearnMoreButton.click();
    });
  }

  async clickHeroCarouselNextArrow(): Promise<void> {
    await test.step('Click next arrow in hero carousel', async () => {
      await this.heroCarouselNextArrow.click();
    });
  }

  async clickHeroCarouselPrevArrow(): Promise<void> {
    await test.step('Click previous arrow in hero carousel', async () => {
      await this.heroCarouselPrevArrow.click();
    });
  }

  async clickHeroCarouselDot(index: number): Promise<void> {
    await test.step(`Click on hero carousel dot at index: ${index}`, async () => {
      await this.heroCarouselDots.getByRole('button', { name: `${index}` }).click();
    });
  }
}
