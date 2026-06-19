import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export type SocialPlatform = 'facebook' | 'youtube' | 'instagram' | 'mail';
export class SocialInfoComponent extends BaseComponent {
  private readonly facebookLink: Locator;
  private readonly youtubeLink: Locator;
  private readonly instagramLink: Locator;
  private readonly mailLink: Locator;
  private readonly donateButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.facebookLink = this.root.locator('a:has([aria-label="facebook"])');
    this.youtubeLink = this.root.locator('a:has([aria-label="youtube"])');
    this.instagramLink = this.root.locator('a:has([aria-label="instagram"])');
    this.mailLink = this.root.locator('a:has([aria-label="mail"])');
    this.donateButton = this.root.locator('.donate-button');
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

  async getSocialLinkHref(platform: SocialPlatform): Promise<string | null> {
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
