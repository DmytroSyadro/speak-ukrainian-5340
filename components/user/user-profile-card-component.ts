import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class UserProfileCardComponent extends BaseComponent {
  private readonly userName: Locator;
  private readonly userRole: Locator;
  private readonly phone: Locator;
  private readonly email: Locator;
  private readonly editProfileButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.userName = this.root.locator('.user-name');
    this.userRole = this.root.locator('.user-role');

    this.phone = this.root.locator('.user-phone-data');
    this.email = this.root.locator('.user-email-data');

    this.editProfileButton = this.root.locator('.edit-button button');
  }

  async getUserName(): Promise<string> {
    return await this.userName.innerText();
  }

  async getUserRole(): Promise<string> {
    return await this.userRole.innerText();
  }

  async getPhone(): Promise<string> {
    return await this.phone.innerText();
  }

  async getEmail(): Promise<string> {
    return await this.email.innerText();
  }

  async clickEditProfile(): Promise<void> {
    await this.editProfileButton.click();
  }

  async isEditProfileButtonVisible(): Promise<boolean> {
    return await this.editProfileButton.isVisible();
  }

  async isProfileCardDisplayed(): Promise<boolean> {
    return await this.root.isVisible();
  }
}
