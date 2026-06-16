import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { FaqComponent } from './components/faq-component';

export class ServicesPage extends BasePage {
  readonly heroTitle: Locator;
  readonly descriptionTitle: Locator;
  readonly description: Locator;
  readonly supportProjectButton: Locator;
  readonly links: Locator;
  readonly heroBannerImage: Locator;
  readonly faq: FaqComponent;

  constructor(page: Page) {
    super(page);

    this.heroTitle = page.locator('.title .text');
    this.heroBannerImage = page.locator('.title');

    this.links = page.locator('.social-info a');
    this.supportProjectButton = page.locator('.help-button .donate-button');

    this.descriptionTitle = page.locator('.content-title');
    this.description = page.locator('.content-text');

    this.faq = new FaqComponent(page.locator('.faq'));
  }

  async navigateToServicesPage(): Promise<void> {
    await this.page.goto('/services');
  }

  async getHeroTitle(): Promise<string> {
    return (await this.heroTitle.textContent()) || '';
  }

  async getDescriptionTitle(): Promise<string> {
    return (await this.descriptionTitle.textContent()) || '';
  }

  async getDescription(): Promise<string> {
    return (await this.description.textContent()) || '';
  }

  async getSupportProjectButton(): Promise<Locator> {
    return this.supportProjectButton;
  }

  async getLinks(): Promise<string[]> {
    const count = await this.links.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await this.links.nth(i).getAttribute('href');
      hrefs.push(href || '');
    }
    return hrefs;
  }

  async clickSocialLink(index: number): Promise<void> {
    await this.links.nth(index).click();
  }

  async clickSupportProjectButton(): Promise<void> {
    await this.supportProjectButton.click();
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await this.heroBannerImage.isVisible();
  }

  async isSupportProjectButtonVisible(): Promise<boolean> {
    return await this.supportProjectButton.isVisible();
  }

  async isFaqSectionVisible(): Promise<boolean> {
    return this.faq.isVisible();
  }
}
