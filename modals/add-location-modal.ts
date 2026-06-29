import { expect, type Locator, type Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';
import { DropdownComponent } from '@/components/common/dropdown-component';

export class AddLocationModal extends BaseModal {
  private static readonly ROOT_SELECTOR =
    'div.modal-add-club .ant-modal-content:has(div.add-club-header:has-text("Додати локацію"))';

  private readonly nameInput: Locator;
  private readonly cityDropdownTrigger: Locator;
  private readonly districtDropdownTrigger: Locator;
  private readonly stationDropdownTrigger: Locator;
  private readonly addressInput: Locator;
  private readonly coordinatesInput: Locator;
  private readonly phoneInput: Locator;
  private readonly addButton: Locator;
  private readonly dropdownLocator: Locator;

  private dropdown: DropdownComponent;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator(AddLocationModal.ROOT_SELECTOR);

    this.nameInput = this.root.locator('#name');
    this.cityDropdownTrigger = this.root
      .locator('.ant-select')
      .filter({ has: this.page.locator('#cityName') })
      .locator('.ant-select-selector');
    this.districtDropdownTrigger = this.root
      .locator('.ant-select')
      .filter({ has: this.page.locator('#districtName') })
      .locator('.ant-select-selector');
    this.stationDropdownTrigger = this.root
      .locator('.ant-select')
      .filter({ has: this.page.locator('#stationName') })
      .locator('.ant-select-selector');
    this.addressInput = this.root.locator('#address');
    this.coordinatesInput = this.root.locator('#coordinates');
    this.phoneInput = this.root.locator('#phone');
    this.addButton = this.root.locator('button[type="submit"]').filter({ hasText: 'Додати' });

    // 🔥 ФІКС ТУТ: Замість this.root використовуємо this.page 🔥
    this.dropdownLocator = this.page.locator(
      '.ant-select-dropdown:not(.ant-select-dropdown-hidden)'
    );
    this.dropdown = new DropdownComponent(this.dropdownLocator);
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(AddLocationModal.ROOT_SELECTOR);
  }

  async fillLocationName(name: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.nameInput.press('Tab');
  }

  async fillAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
    await this.addressInput.press('Tab');
  }

  async fillCoordinates(coordinates: string): Promise<void> {
    await this.coordinatesInput.fill(coordinates);
    await this.coordinatesInput.press('Tab');
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.phoneInput.press('Tab');
  }

  private async openAndSelectDropdown(trigger: Locator, optionText: string): Promise<void> {
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await this.dropdown.waitForVisible();
    await this.dropdown.select(optionText);
    await this.dropdown.waitForHidden();
  }

  async selectCity(cityName: string): Promise<void> {
    await this.openAndSelectDropdown(this.cityDropdownTrigger, cityName);
  }

  async selectDistrict(districtName: string): Promise<void> {
    await this.openAndSelectDropdown(this.districtDropdownTrigger, districtName);
  }

  async selectStation(stationName: string): Promise<void> {
    await this.openAndSelectDropdown(this.stationDropdownTrigger, stationName);
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.scrollIntoViewIfNeeded();
    await expect(this.addButton).toBeEnabled();
    await this.addButton.click();
  }
}
