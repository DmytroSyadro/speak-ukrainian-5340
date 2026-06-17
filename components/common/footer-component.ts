import type { Locator } from '@playwright/test';
import { BaseComponent } from '../base-component';

export class FooterComponent extends BaseComponent {
  private readonly socialLinks: Locator;
  private readonly donateButton: Locator;
  private readonly partnerLogos: Locator;

  constructor(root: Locator) {
    super(root);
    this.socialLinks = this.root.locator('.social-media .links a');
    this.donateButton = this.root.locator('.donate-button');
    this.partnerLogos = this.root.locator('.sponsors img');
  }

  async clickSocialLink(index: number): Promise<void> {
    await this.socialLinks.nth(index).click();
  }

  async clickDonateButton(): Promise<void> {
    await this.donateButton.click();
  }

  async getSocialLinksCount(): Promise<number> {
    return await this.socialLinks.count();
  }

  async getSocialLinkHref(index: number): Promise<string | null> {
    return await this.socialLinks.nth(index).getAttribute('href');
  }

  async getPartnersCount(): Promise<number> {
    return await this.partnerLogos.count();
  }

  async isDonateButtonVisible(): Promise<boolean> {
    return await this.donateButton.isVisible();
  }
}
