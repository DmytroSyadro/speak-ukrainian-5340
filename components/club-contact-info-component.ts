import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class ClubContactInfoComponent extends BaseComponent {
  private readonly address: Locator;
  private readonly map: Locator;
  private readonly audienceAge: Locator;
  private readonly websiteLink: Locator;
  private readonly phoneNumber: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.address = this.root.locator('.address');
    this.map = this.root.locator('.map');
    this.audienceAge = this.root.locator('.age');
    this.websiteLink = this.root.locator('.links .contact').first().locator('a');
    this.phoneNumber = this.root.locator('.links .contact').nth(1);
  }

  async getAddress(): Promise<string> {
    return await this.address.innerText();
  }

  async getAudienceAge(): Promise<string> {
    return await this.audienceAge.innerText();
  }

  async getWebsiteLink(): Promise<string | null> {
    return await this.websiteLink.getAttribute('href');
  }

  async getPhoneNumber(): Promise<string> {
    return await this.phoneNumber.innerText();
  }

  async isMapDisplayed(): Promise<boolean> {
    return await this.map.isVisible();
  }
}
