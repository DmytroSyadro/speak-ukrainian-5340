import type { Page, Locator } from '@playwright/test';
import { SideBarComponent } from '@/components/common/side-bar-component';
import { UserProfileCardComponent } from '@/components/user/user-profile-card-component';
import { UserItemsSectionComponent } from '@/components/user/user-items-section-component';
import { BasePage } from '@/pages/base-page';

export class ProfilePage extends BasePage {
  private readonly profilePage: Locator;
  private readonly editForm: Locator;
  public readonly sideBarLocator: Locator;
  public readonly sideBar: SideBarComponent;
  public readonly profileCardLocator: Locator;
  public readonly profileCard: UserProfileCardComponent;
  public readonly userItemsLocator: Locator;
  public readonly userItems: UserItemsSectionComponent;
  private readonly addClubModal: Locator;
  private readonly addClubOption: Locator;
  public readonly messagesTitle: Locator;
  public readonly complaintsTitle: Locator;
  public readonly applicationsTitle: Locator;
  public readonly certificatesTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.profilePage = this.page.locator('.user-page');
    this.editForm = this.page.locator('.user-edit.ant-modal, .ant-modal.user-edit');
    this.sideBarLocator = this.page.locator('.sider-profile');
    this.sideBar = new SideBarComponent(this.sideBarLocator);
    this.profileCardLocator = this.page.locator('.user-information');
    this.profileCard = new UserProfileCardComponent(this.profileCardLocator);
    this.userItemsLocator = this.page.locator('main.user-content');
    this.userItems = new UserItemsSectionComponent(this.userItemsLocator);
    this.addClubModal = this.page.locator('.modal-add-club, .ant-modal:visible');
    this.addClubOption = this.page.getByText('Додати гурток');
    this.messagesTitle = this.page.locator('.messagesContent .contentTitle');
    this.complaintsTitle = this.page.locator('.messagesContent .contentTitle');
    this.applicationsTitle = this.page.locator('.registrationsContent .contentTitle .titleText');
    this.certificatesTitle = this.page.locator('.messagesContent .contentTitle');
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

  async isEditFormVisible(): Promise<boolean> {
    return await this.editForm.isVisible();
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

  async getUserIdFromUrl(): Promise<number> {
    const url = this.page.url();
    const userIdMatch = url.match(/\/user\/(\d+)/);
    return userIdMatch ? parseInt(userIdMatch[1]) : 1;
  }

  async waitForSection(sectionName: string): Promise<void> {
    const sectionMap: Record<string, Locator> = {
      profile: this.profilePage,
      messages: this.messagesTitle,
      complaints: this.complaintsTitle,
      applications: this.applicationsTitle,
      certificates: this.certificatesTitle,
    };

    const section = sectionMap[sectionName];
    if (!section) {
      throw new Error(`Unknown section: ${sectionName}`);
    }

    await this.waitForVisible(section);
  }

  async getMessagesTitle(): Promise<string> {
    return (await this.messagesTitle.textContent()) || '';
  }

  async getComplaintsTitle(): Promise<string> {
    return (await this.complaintsTitle.textContent()) || '';
  }

  async getApplicationsTitle(): Promise<string> {
    return (await this.applicationsTitle.textContent()) || '';
  }

  async getCertificatesTitle(): Promise<string> {
    return (await this.certificatesTitle.textContent()) || '';
  }

  async clickAddClub(): Promise<void> {
    await this.userItems.clickAddClub();
  }

  async clickAddClubAndWaitForModal(): Promise<void> {
    await this.userItems.clickAdd();
    await this.waitForVisible(this.addClubOption);
    await this.addClubOption.click();
    await this.waitForVisible(this.addClubModal);
  }

  async isCreationFormVisible(): Promise<boolean> {
    return await this.addClubModal.isVisible().catch(() => false);
  }
}
