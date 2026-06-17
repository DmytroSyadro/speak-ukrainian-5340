import type { Locator } from '@playwright/test';

import { BaseComponent } from '../base-component';

export class UserItemsSectionComponent extends BaseComponent {
  private readonly itemTypeDropdown: Locator;
  private readonly addButton: Locator;
  private readonly userClubContent: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.itemTypeDropdown = this.root.locator('.club-center-select');
    this.addButton = this.root.getByRole('button', { name: /додати/i });
    this.userClubContent = this.root.locator('.user-club-content');
  }

  async selectItemType(type: string): Promise<void> {
    await this.itemTypeDropdown.click();

    await this.root.locator('.ant-select-dropdown').getByText(type, { exact: true }).click();
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
  }

  async getItemsCount(): Promise<number> {
    return await this.userClubContent.locator('.ant-layout, .center-profile').count();
  }

  async getSelectedCategory(): Promise<string> {
    return await this.itemTypeDropdown.innerText();
  }

  async openItemByIndex(index: number): Promise<void> {
    await this.userClubContent.locator('.ant-layout, .center-profile').nth(index).click();
  }

  async isUserItemsSectionDisplayed(): Promise<boolean> {
    return await this.itemTypeDropdown.isVisible();
  }

  async isAddButtonVisible(): Promise<boolean> {
    return await this.addButton.isVisible();
  }
}
