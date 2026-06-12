import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ServicesPage extends BasePage {
  readonly heroTitle: Locator;
  readonly descriptionTitle: Locator;
  readonly description: Locator;
  readonly supportProjectButton: Locator;
  readonly links: Locator;
  readonly faqItems: Locator;
  readonly heroBannerImage: Locator;
  readonly faqSection: Locator;

  constructor(page: Page) {
    super(page);

    this.heroTitle = page.locator('.title .text');
    this.heroBannerImage = page.locator('.title');

    this.links = page.locator('.social-info a');
    this.supportProjectButton = page.locator('.help-button .donate-button');

    this.descriptionTitle = page.locator('.content-title');
    this.description = page.locator('.content-text');

    this.faqSection = page.locator('.faq');
    this.faqItems = page.locator('.faq .ant-collapse-item');
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

  async getFaqItems(): Promise<Locator> {
    return this.faqItems;
  }

  async getFaqItemTitle(index: number): Promise<string> {
    return (await this.faqItems.nth(index).locator('.ant-collapse-header').textContent()) || '';
  }

  async getFaqItemContent(index: number): Promise<string> {
    return (
      (await this.faqItems.nth(index).locator('.ant-collapse-content-box').textContent()) || ''
    );
  }

  async getFaqToggleArrow(index: number): Promise<Locator> {
    return this.faqItems.nth(index).locator('.ant-collapse-arrow');
  }

  async clickSocialLink(index: number): Promise<void> {
    await this.links.nth(index).click();
  }

  async clickSupportProjectButton(): Promise<void> {
    await this.supportProjectButton.click();
  }

  async clickFaqItem(index: number): Promise<void> {
    await this.faqItems.nth(index).locator('.ant-collapse-header').click();
  }

  async isFaqItemExpanded(index: number): Promise<boolean> {
    const item = this.faqItems.nth(index);
    const classAttr = (await item.getAttribute('class')) || '';
    return classAttr.includes('ant-collapse-item-active');
  }

  async isHeroBannerVisible(): Promise<boolean> {
    return await this.heroBannerImage.isVisible();
  }

  async isSupportProjectButtonVisible(): Promise<boolean> {
    return await this.supportProjectButton.isVisible();
  }

  async isFaqSectionVisible(): Promise<boolean> {
    return await this.faqSection.isVisible();
  }

  async getFaqItemsCount(): Promise<number> {
    return await this.faqItems.count();
  }

  async getAllFaqTitles(): Promise<string[]> {
    const count = await this.getFaqItemsCount();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      titles.push(await this.getFaqItemTitle(i));
    }
    return titles;
  }

  async expandFaqItem(index: number): Promise<void> {
    const isExpanded = await this.isFaqItemExpanded(index);
    if (!isExpanded) {
      await this.clickFaqItem(index);
    }
  }

  async collapseFaqItem(index: number): Promise<void> {
    const isExpanded = await this.isFaqItemExpanded(index);
    if (isExpanded) {
      await this.clickFaqItem(index);
    }
  }
}
