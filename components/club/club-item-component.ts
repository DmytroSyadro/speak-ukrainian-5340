import { BaseComponent } from '../base-component';
import type { Locator } from '@playwright/test';

export class ClubItemComponent extends BaseComponent {
  private readonly clubIcon: Locator;
  private readonly clubName: Locator;
  private readonly address: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.clubIcon = this.root.locator(".//div[@class='icon-box']");
    this.clubName = this.root.locator(".//*[@class='text']");
    this.address = this.root.locator(".//*[@class='name']");
  }
  async isClubIconVisible(): Promise<boolean> {
    return await this.clubIcon.isVisible();
  }
  async getClubName(): Promise<string> {
    return await this.clubName.innerText();
  }
  async getAddress(): Promise<string> {
    return await this.address.innerText();
  }
}
