import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class SideBarComponent extends BaseComponent {
  private readonly profileTab: Locator;
  private readonly messagesTab: Locator;
  private readonly complaintsTab: Locator;
  private readonly applicationsTab: Locator;
  private readonly certificatesTab: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.profileTab = this.root.getByText('Профіль', { exact: true });
    this.messagesTab = this.root.getByText('Повідомлення', { exact: true });
    this.complaintsTab = this.root.getByText('Скарги', { exact: true });
    this.applicationsTab = this.root.getByText('Заявки', { exact: true });
    this.certificatesTab = this.root.getByText('Сертифікати', { exact: true });
  }

  async clickProfile(): Promise<void> {
    await this.profileTab.click();
  }

  async clickMessages(): Promise<void> {
    await this.messagesTab.click();
  }

  async clickComplaints(): Promise<void> {
    await this.complaintsTab.click();
  }

  async clickApplications(): Promise<void> {
    await this.applicationsTab.click();
  }

  async clickCertificates(): Promise<void> {
    await this.certificatesTab.click();
  }

  async isProfileTabVisible(): Promise<boolean> {
    return await this.profileTab.isVisible();
  }

  async isMessagesTabVisible(): Promise<boolean> {
    return await this.messagesTab.isVisible();
  }

  async isComplaintsTabVisible(): Promise<boolean> {
    return await this.complaintsTab.isVisible();
  }

  async isApplicationsTabVisible(): Promise<boolean> {
    return await this.applicationsTab.isVisible();
  }

  async isCertificatesTabVisible(): Promise<boolean> {
    return await this.certificatesTab.isVisible();
  }
}
