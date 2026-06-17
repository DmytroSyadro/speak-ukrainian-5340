import type { Page, Locator } from '@playwright/test';

import { BasePage } from './base-page';
import { SideBarComponent } from '@/components/side-bar-component';
import { UserProfileCardComponent } from '@/components/user-profile-card-component';
import { UserItemsSectionComponent } from '@/components/user-items-section-component';

export class ProfilePage extends BasePage {
  private readonly profilePage: Locator;

  public readonly sideBarLocator: Locator;
  public readonly sideBar: SideBarComponent;
  public readonly profileCardLocator: Locator;
  public readonly profileCard: UserProfileCardComponent;
  public readonly userItemsLocator: Locator;
  public readonly userItems: UserItemsSectionComponent;

  constructor(page: Page) {
    super(page);

    this.profilePage = this.page.locator('.user-page');
    this.sideBarLocator = this.page.locator('.sider-profile');
    this.sideBar = new SideBarComponent(this.sideBarLocator);
    this.profileCardLocator = this.page.locator('.user-information');
    this.profileCard = new UserProfileCardComponent(this.profileCardLocator);
    this.userItemsLocator = this.page.locator('main.user-content');
    this.userItems = new UserItemsSectionComponent(this.userItemsLocator);
  }

  async navigateToProfile(userId: number): Promise<void> {
    await this.navigateTo(`/user/${userId}/page`);
  }

  async getUserName(): Promise<string> {
    return await this.profileCard.getUserName();
  }

  async getUserRole(): Promise<string> {
    return await this.profileCard.getUserRole();
  }

  async getPhone(): Promise<string> {
    return await this.profileCard.getPhone();
  }

  async getEmail(): Promise<string> {
    return await this.profileCard.getEmail();
  }

  async getSelectedCategory(): Promise<string> {
    return await this.userItems.getSelectedCategory();
  }

  async getItemsCount(): Promise<number> {
    return await this.userItems.getItemsCount();
  }

  async clickEditProfile(): Promise<void> {
    await this.profileCard.clickEditProfile();
  }

  async clickProfileTab(): Promise<void> {
    await this.sideBar.clickProfile();
  }

  async clickMessagesTab(): Promise<void> {
    await this.sideBar.clickMessages();
  }

  async clickComplaintsTab(): Promise<void> {
    await this.sideBar.clickComplaints();
  }

  async clickApplicationsTab(): Promise<void> {
    await this.sideBar.clickApplications();
  }

  async clickCertificatesTab(): Promise<void> {
    await this.sideBar.clickCertificates();
  }

  async clickAddButton(): Promise<void> {
    await this.userItems.clickAdd();
  }

  async isProfilePageDisplayed(): Promise<boolean> {
    return await this.profilePage.isVisible();
  }
}
