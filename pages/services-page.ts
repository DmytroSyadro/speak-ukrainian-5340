import type { Page, Locator } from '@playwright/test';
import { FaqComponent } from '@/components/faq/faq-component';
import { BasePage } from '@/pages/base-page';

import * as allure from 'allure-js-commons';

export class ServicesPage extends BasePage {
  protected readonly heroTitle: Locator;
  protected readonly descriptionTitle: Locator;
  protected readonly description: Locator;
  protected readonly supportProjectButton: Locator;
  protected readonly links: Locator;
  protected readonly heroBannerImage: Locator;
  protected readonly faqLocator: Locator;
  protected readonly faq: FaqComponent;

  constructor(page: Page) {
    super(page);

    this.heroTitle = page.locator('.title .text');
    this.heroBannerImage = page.locator('.title');

    this.links = page.locator('.social-info a');
    this.supportProjectButton = page.locator('.help-button .donate-button');

    this.descriptionTitle = page.locator('.content-title');
    this.description = page.locator('.content-text');

    this.faqLocator = page.locator('.faq');
    this.faq = new FaqComponent(this.faqLocator);
  }

  async navigateToServicesPage(): Promise<void> {
    await allure.step('Navigate to services page', async (): Promise<void> => {
      await this.page.goto('/services');
    });
  }

  async getHeroTitle(): Promise<string> {
    return await allure.step('Get hero title text', async (): Promise<string> => {
      return (await this.heroTitle.textContent()) || '';
    });
  }

  async getDescriptionTitle(): Promise<string> {
    return await allure.step('Get description title text', async (): Promise<string> => {
      return (await this.descriptionTitle.textContent()) || '';
    });
  }

  async getDescription(): Promise<string> {
    return await allure.step('Get description text', async (): Promise<string> => {
      return (await this.description.textContent()) || '';
    });
  }

  async getSupportProjectButton(): Promise<Locator> {
    return this.supportProjectButton;
  }

  async getLinks(): Promise<string[]> {
    return await allure.step('Get all social links hrefs', async (): Promise<string[]> => {
      const count = await this.links.count();
      const hrefs: string[] = [];
      for (let i = 0; i < count; i++) {
        const href = await this.links.nth(i).getAttribute('href');
        hrefs.push(href || '');
      }
      return hrefs;
    });
  }

  async clickSocialLink(index: number): Promise<void> {
    await allure.step(`Click social link at index ${index}`, async (): Promise<void> => {
      await this.links.nth(index).click();
    });
  }

  async clickSupportProjectButton(): Promise<void> {
    await allure.step('Click support project button', async (): Promise<void> => {
      await this.supportProjectButton.click();
    });
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await allure.step('Check if hero banner is visible', async (): Promise<boolean> => {
      return await this.heroBannerImage.isVisible();
    });
  }

  async isSupportProjectButtonVisible(): Promise<boolean> {
    return await allure.step(
      'Check if support project button is visible',
      async (): Promise<boolean> => {
        return await this.supportProjectButton.isVisible();
      }
    );
  }

  async isFaqSectionVisible(): Promise<boolean> {
    return await allure.step('Check if FAQ section is visible', async (): Promise<boolean> => {
      return await this.faq.isVisible();
    });
  }

  getFaqComponent(): FaqComponent {
    return this.faq;
  }
}
