import type { Locator } from '@playwright/test';
import { ClubCategory, CitiesUser } from '@/data';
import { BaseComponent } from '@/components/base-component';
import { DropdownComponent } from '@/components/common/dropdown-component';

export class AdvancedSearchComponent extends BaseComponent {
  private readonly clubRadioButton: Locator;
  private readonly centerRadioButton: Locator;
  private readonly ageField: Locator;
  private readonly categoryButton: Locator;
  private readonly remoteButton: Locator;
  private readonly cityDropdown: Locator;
  private readonly districtDropdown: Locator;
  private readonly closestStationDropdown: Locator;
  private readonly onlineLabel: Locator;
  private readonly ageLabel: Locator;
  private readonly categoryLabel: Locator;

  private readonly dropDownLocator: Locator;

  private dropdown: DropdownComponent;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.clubRadioButton = this.root.locator('.ant-radio-wrapper', { hasText: 'Гурток' });
    this.centerRadioButton = this.root.locator('.ant-radio-wrapper', { hasText: 'Центр' });
    this.ageField = this.root.locator("xpath=.//input[@class='ant-input-number-input']");
    this.categoryButton = this.root.locator(
      "xpath=.//div[@id='basic_categoriesName']//input[@class='ant-checkbox-input']"
    );
    this.remoteButton = this.root.locator(
      "xpath=.//div[@id='basic_isOnline']//input[@class='ant-checkbox-input']"
    );
    this.cityDropdown = this.root.locator("xpath=.//*[@id='basic_cityName']");
    this.districtDropdown = this.root.locator("xpath=.//*[@id='basic_districtName']");
    this.closestStationDropdown = this.root.locator("xpath=.//*[@id='basic_stationName']");
    this.dropDownLocator = this.root
      .page()
      .locator(
        "xpath=//div[contains(@class, 'ant-select-dropdown') and not(contains(@class, 'hidden'))]"
      );
    this.onlineLabel = this.root.locator('.ant-typography').getByText('Ремоут');
    this.ageLabel = this.root.locator('.ant-typography').getByText('Вік дитини');
    this.categoryLabel = this.root.locator('.ant-typography').getByText('Категорії');

    this.dropdown = new DropdownComponent(this.dropDownLocator);
  }

  async isClubRadioButtonChecked(): Promise<boolean> {
    return await this.clubRadioButton.isChecked();
  }
  async isCentreRadioButtonChecked(): Promise<boolean> {
    return await this.centerRadioButton.isChecked();
  }
  async isAgeFieldVisible(): Promise<boolean> {
    return await this.ageField.isVisible();
  }
  async getAgeFieldText(): Promise<string> {
    return await this.ageField.inputValue();
  }
  async isOnlineLabelVisible(): Promise<boolean> {
    return await this.onlineLabel.isVisible();
  }
  async isCategoryLabelVisible(): Promise<boolean> {
    return await this.categoryLabel.isVisible();
  }
  async clickCategoryButton(category: ClubCategory): Promise<AdvancedSearchComponent> {
    await this.categoryButton.filter({ hasText: category }).click();
    return this;
  }
  async isRemoteButtonChecked(): Promise<boolean> {
    return await this.remoteButton.isChecked();
  }
  async isCityDropdownVisible(): Promise<boolean> {
    return await this.cityDropdown.isVisible();
  }
  async isDistrictDropdownVisible(): Promise<boolean> {
    return await this.districtDropdown.isVisible();
  }
  async isClosestStationDropdownVisible(): Promise<boolean> {
    return await this.closestStationDropdown.isVisible();
  }
  async isAgeLabelVisible(): Promise<boolean> {
    return await this.ageLabel.isVisible();
  }
  async selectCity(city: CitiesUser): Promise<AdvancedSearchComponent> {
    await this.cityDropdown.click();
    await this.dropdown.select(city);
    return this;
  }
  async selectDistrict(district: string): Promise<AdvancedSearchComponent> {
    await this.districtDropdown.click();
    await this.dropdown.select(district);
    return this;
  }
  async selectClosestStation(station: string): Promise<AdvancedSearchComponent> {
    await this.closestStationDropdown.click();
    await this.dropdown.select(station);
    return this;
  }
  async clickClubRadioButton(): Promise<AdvancedSearchComponent> {
    await this.clubRadioButton.click();
    return this;
  }
  async clickCentreRadioButton(): Promise<AdvancedSearchComponent> {
    await this.centerRadioButton.click();
    return this;
  }
  async clickRemoteButton(): Promise<AdvancedSearchComponent> {
    await this.remoteButton.click();
    return this;
  }
  async fillAgeField(age: string): Promise<AdvancedSearchComponent> {
    await this.ageField.clear();
    await this.ageField.pressSequentially(age, { delay: 100 });
    return this;
  }
}
