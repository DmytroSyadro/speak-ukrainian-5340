import { BaseComponent } from './base-component';
import type { Locator } from '@playwright/test';
import { DropdownComponent } from './dropdown-component';
import { ClubCategory } from '../../data/club-category';
import { CitiesUser } from '../../data/cities-user';

export class FilterMapComponent extends BaseComponent {
  private readonly cityField: Locator;
  private readonly categoryField: Locator;
  private readonly dropdownLocator: Locator;
  private readonly dropdown: DropdownComponent;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.cityField = this.root.locator('#mapCitiesList');
    this.categoryField = this.root.locator('.ant-select.selectCity').nth(1);
    this.dropdownLocator = this.root
      .page()
      .locator(
        "xpath=//div[contains(@class, 'ant-select-dropdown') and not(contains(@class, 'hidden'))]"
      );
    this.dropdown = new DropdownComponent(this.dropdownLocator);
  } //

  async selectCity(city: CitiesUser): Promise<FilterMapComponent> {
    await this.cityField.click();
    await this.dropdown.select(city);
    return this;
  }

  async selectCategory(category: ClubCategory): Promise<FilterMapComponent> {
    await this.categoryField.click();
    await this.dropdown.select(category);
    return this;
  }

  async getCityFieldText(): Promise<string> {
    return await this.cityField.inputValue();
  }

  async getCategoryFieldText(): Promise<string> {
    return await this.categoryField.inputValue();
  }

  async isCityFieldVisible(): Promise<boolean> {
    return await this.cityField.isVisible();
  }

  async isCategoryFieldVisible(): Promise<boolean> {
    return await this.categoryField.isVisible();
  }

  async getCityOptions(): Promise<string[]> {
    await this.cityField.click();
    return await this.dropdown.getOptionsText();
  }

  async getCategoryOptions(): Promise<string[]> {
    await this.categoryField.click();
    return await this.dropdown.getOptionsText();
  }

  async fillCityField(text: string): Promise<void> {
    await this.cityField.clear();
    await this.cityField.pressSequentially(text, { delay: 100 });
  }

  async fillCategoryField(text: string): Promise<void> {
    await this.categoryField.clear();
    await this.categoryField.pressSequentially(text, { delay: 100 });
  }

  async isCityDropdownVisible(): Promise<boolean> {
    return await this.dropdown.isVisible();
  }

  async isCityDropdownHidden(): Promise<boolean> {
    return await this.dropdown.isHidden();
  }
}
