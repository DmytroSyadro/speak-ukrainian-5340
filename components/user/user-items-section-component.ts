import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

/**
 * Component representing user's items section on profile page
 * Contains dropdown for item type selection, add button, and list of user's clubs
 */

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
    this.addClubText = this.page.getByText('Додати гурток', { exact: true });
    this.selectDropdown = (type: string) =>
      this.page.locator('.ant-select-dropdown').getByText(type, { exact: true });
  }

  /**
   * Select an item type from the dropdown
   * @param type - The type to select (e.g., 'Гуртки')
   */
  async selectItemType(type: string): Promise<void> {
    await this.itemTypeDropdown.click();
    await this.selectDropdown(type).click();
  }

  /** Click the Add button to open dropdown */
  async clickAdd(): Promise<void> {
    await this.addButton.click();
  }

  /** Click Add button and select "Додати гурток" from dropdown */
  async clickAddClub(): Promise<void> {
    await this.addButton.click();
    await this.waitForLocatorVisible(this.addClubText);
    await this.addClubText.click();
  }

  /** Get the number of clubs/items in the user's list */
  async getItemsCount(): Promise<number> {
    return await this.clubItems.count();
  }

  /** Get the currently selected category text */
  async getSelectedCategory(): Promise<string> {
    return await this.itemTypeDropdown.innerText();
  }

  /** Open an item by its index in the list */
  async openItemByIndex(index: number): Promise<void> {
    await this.clubItems.nth(index).click();
  }

  /** Check if the user items section is displayed */
  async isUserItemsSectionDisplayed(): Promise<boolean> {
    return await this.itemTypeDropdown.isVisible();
  }

  /** Check if the Add button is visible */
  async isAddButtonVisible(): Promise<boolean> {
    return await this.addButton.isVisible();
  }
}
