import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class UserItemsSectionComponent extends BaseComponent {
  private readonly itemTypeDropdown: Locator;
  private readonly addButton: Locator;
  private readonly userClubContent: Locator;
  private readonly clubItems: Locator;
  private readonly addClubText: Locator;
  private readonly selectDropdown: (type: string) => Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.itemTypeDropdown = this.root.locator('.club-center-select');
    this.addButton = this.root.getByRole('button', { name: /додати/i });
    this.userClubContent = this.root.locator('.user-club-content');
    this.clubItems = this.userClubContent.locator('.ant-layout, .center-profile');
    this.addClubText = this.addButton.getByText('Додати гурток', { exact: true });
    this.selectDropdown = (type: string) =>
      this.root.locator('.ant-select-dropdown').getByText(type, { exact: true });
  }

  async selectItemType(type: string): Promise<void> {
    await this.itemTypeDropdown.click();
    await this.selectDropdown(type).click();
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
  }

  async clickAddClub(): Promise<void> {
    await this.addButton.click();
    await this.waitForLocatorVisible(this.addClubText);
    await this.addClubText.click();
  }

  async getItemsCount(): Promise<number> {
    return await this.clubItems.count();
  }

  async getSelectedCategory(): Promise<string> {
    return await this.itemTypeDropdown.innerText();
  }

  async openItemByIndex(index: number): Promise<void> {
    await this.clubItems.nth(index).click();
  }

  async isUserItemsSectionDisplayed(): Promise<boolean> {
    return await this.itemTypeDropdown.isVisible();
  }

  async isAddButtonVisible(): Promise<boolean> {
    return await this.addButton.isVisible();
  }
}
