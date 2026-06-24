import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class UserItemsSectionComponent extends BaseComponent {
  private readonly itemTypeDropdown: Locator;
  private readonly addButton: Locator;
  private readonly userClubContent: Locator;
  private readonly updateMenu: Locator;
  private readonly menuItems: Locator;
  private readonly successMessages: Locator;
  private readonly cardLocators: Locator;
  private readonly dropdownTrigger: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.itemTypeDropdown = this.root.locator('.club-center-select');
    this.addButton = this.root.getByRole('button', { name: /додати/i });
    this.userClubContent = this.root.locator('.user-club-content');

    this.updateMenu = this.page.locator('.update-menu:not(.ant-dropdown-hidden)');
    this.menuItems = this.updateMenu.locator('li');
    this.successMessages = this.page.locator('.ant-message-success');
    this.cardLocators = this.root.locator('.card');
    this.dropdownTrigger = this.root.locator('.update-club-dropdown .ant-dropdown-trigger');
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

  async deleteClubByTitle(
    title: string,
    deleteOptionText: string,
    expectedSuccessMessage: string
  ): Promise<void> {
    const targetCard = this.cardLocators.filter({ hasText: title });
    await targetCard.waitFor({ state: 'visible' });

    await targetCard.locator('.update-club-dropdown .ant-dropdown-trigger').click();
    await this.updateMenu.waitFor({ state: 'visible' });

    const deleteClubOption = this.menuItems.filter({ hasText: deleteOptionText });
    await deleteClubOption.click();

    await this.successMessages
      .filter({ hasText: expectedSuccessMessage })
      .waitFor({ state: 'visible' });
  }
}
