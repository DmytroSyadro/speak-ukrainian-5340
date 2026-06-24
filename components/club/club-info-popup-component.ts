import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import * as allure from 'allure-js-commons';

export class ClubInfoPopupComponent extends BaseComponent {
  private readonly moreAboutButton: Locator;
  private readonly addressText: Locator;
  private readonly clubName: Locator;
  private readonly clubDescription: Locator;
  private readonly closeButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.moreAboutButton = this.root.locator('.ant-btn.ant-btn-default');
    this.addressText = this.root.locator('.text');
    this.clubName = this.root.locator('.title');
    this.clubDescription = this.root.locator('.description');
    this.closeButton = this.root.locator('button.gm-ui-hover-effect');
  }

  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async isHidden(): Promise<boolean> {
    return await this.root.isHidden();
  }

  async getClubName(): Promise<string> {
    return await this.clubName.innerText();
  }

  async getAddressText(): Promise<string> {
    await this.addressText.waitFor({ state: 'visible' });
    return await this.addressText.innerText();
  }

  async clickMoreAboutButton(): Promise<void> {
    await allure.step('Click "More about" button', async (): Promise<void> => {
      await this.moreAboutButton.click();
    });
  }

  async isMoreAboutButtonVisible(): Promise<boolean> {
    return await this.moreAboutButton.isVisible();
  }

  async isMoreAboutButtonEnabled(): Promise<boolean> {
    return await this.moreAboutButton.isEnabled();
  }

  async getMoreAboutButtonHref(): Promise<string | null> {
    return await this.moreAboutButton.getAttribute('href');
  }

  async getClubDescription(): Promise<string> {
    return await this.clubDescription.innerText();
  }

  async clickCloseButton(): Promise<void> {
    await allure.step('Click close button', async (): Promise<void> => {
      await this.closeButton.click();
    });
  }
}
