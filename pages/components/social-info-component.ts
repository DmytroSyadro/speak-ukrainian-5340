import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

const SELECTORS = {
  facebookLink: 'a:has([aria-label="facebook"])',
  youtubeLink: 'a:has([aria-label="youtube"])',
  instagramLink: 'a:has([aria-label="instagram"])',
  mailLink: 'a:has([aria-label="mail"])',
  donateButton: '.donate-button',
};

export class SocialInfoComponent extends BaseComponent {
  private readonly facebookLink: Locator;
  private readonly youtubeLink: Locator;
  private readonly instagramLink: Locator;
  private readonly mailLink: Locator;
  private readonly donateButton: Locator;

  constructor(page: Page, rootSelector: string) {
    super(page, rootSelector);
    this.facebookLink = this.root.locator(SELECTORS.facebookLink);
    this.youtubeLink = this.root.locator(SELECTORS.youtubeLink);
    this.instagramLink = this.root.locator(SELECTORS.instagramLink);
    this.mailLink = this.root.locator(SELECTORS.mailLink);
    this.donateButton = this.root.locator(SELECTORS.donateButton);
  }

  async clickFacebookLink(): Promise<void> {
    await this.facebookLink.click();
  }

  async clickYoutubeLink(): Promise<void> {
    await this.youtubeLink.click();
  }

  async clickInstagramLink(): Promise<void> {
    await this.instagramLink.click();
  }

  async clickMailLink(): Promise<void> {
    await this.mailLink.click();
  }

  async clickDonateButton(): Promise<void> {
    await this.donateButton.click();
  }

  async getSocialLinkHref(platform: 'facebook' | 'youtube' | 'instagram' | 'mail'): Promise<string | null> {
    switch (platform) {
      case 'facebook':
        return await this.facebookLink.getAttribute('href');
      case 'youtube':
        return await this.youtubeLink.getAttribute('href');
      case 'instagram':
        return await this.instagramLink.getAttribute('href');
      case 'mail':
        return await this.mailLink.getAttribute('href');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
