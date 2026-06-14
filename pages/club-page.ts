import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';
import { ClubBannerTitleComponent } from './components/club-banner-title-component';
import { AdvancedSearchComponent } from './components/advanced-search-component';
import { ListClubCardComponent } from './components/list-club-card-component';
import { ClubCategory } from '../data/club-category';
import { CitiesUser } from '../data/cities-user';
import { ClubCardComponent } from './components/club-card-component';

export class ClubPage extends BasePage {
  private readonly clubBannerTitleLocator: Locator;
  private readonly advancedSearchLocator: Locator;
  private readonly listCardLocator: Locator;

  protected clubBannerTitle: ClubBannerTitleComponent;
  protected advancedSearch: AdvancedSearchComponent;
  protected clubList: ListClubCardComponent;

  constructor(page: Page) {
    super(page);
    this.clubBannerTitleLocator = page.locator("//div[@class='city-name-box']");
    this.advancedSearchLocator = page.locator("//div[@class='ant-layout-sider-children']");
    this.listCardLocator = page.locator("//*[contains(@class,'club-list-content')]");
    this.clubBannerTitle = new ClubBannerTitleComponent(this.clubBannerTitleLocator);
    this.advancedSearch = new AdvancedSearchComponent(this.advancedSearchLocator);
    this.clubList = new ListClubCardComponent(this.listCardLocator);
  }
  async navigate(): Promise<void> {
    await this.page.goto('/clubs');
  }

  async waitForPageLoad(): Promise<void> {
    await this.listCardLocator.waitFor({ state: 'visible' });
  }
  async searchByText(text: string): Promise<ClubPage> {
    await this.searchBar.fillSearchInput(text);
    await this.searchBar.clickSearchButton();
    return this;
  }
  async filterByCity(city: CitiesUser): Promise<ClubPage> {
    await this.advancedSearch.selectCity(city);
    return this;
  }

  async filterByDistrict(district: string): Promise<ClubPage> {
    await this.advancedSearch.selectDistrict(district);
    return this;
  }

  async filterByStation(station: string): Promise<ClubPage> {
    await this.advancedSearch.selectClosestStation(station);
    return this;
  }

  async filterByAge(age: string): Promise<ClubPage> {
    await this.advancedSearch.fillAgeField(age);
    return this;
  }

  async filterByCategory(category: ClubCategory): Promise<ClubPage> {
    await this.advancedSearch.clickCategoryButton(category);
    return this;
  }

  async enableRemoteFilter(): Promise<ClubPage> {
    await this.advancedSearch.clickRemoteButton();
    return this;
  }

  async switchToClubMode(): Promise<ClubPage> {
    await this.advancedSearch.clickClubRadioButton();
    return this;
  }

  async switchToCentreMode(): Promise<ClubPage> {
    await this.advancedSearch.clickCentreRadioButton();
    return this;
  }

  async isClubModeSelected(): Promise<boolean> {
    return await this.advancedSearch.isClubRadioButtonChecked();
  }

  async isCentreModeSelected(): Promise<boolean> {
    return await this.advancedSearch.isCentreRadioButtonChecked();
  }

  async isRemoteFilterChecked(): Promise<boolean> {
    return await this.advancedSearch.isRemoteButtonChecked();
  }

  async isAgeFieldVisible(): Promise<boolean> {
    return await this.advancedSearch.isAgeFieldVisible();
  }

  async getAgeFieldValue(): Promise<string> {
    return await this.advancedSearch.getAgeFieldText();
  }

  async isCityDropdownVisible(): Promise<boolean> {
    return await this.advancedSearch.isCityDropdownVisible();
  }

  async isDistrictDropdownVisible(): Promise<boolean> {
    return await this.advancedSearch.isDistrictDropdownVisible();
  }

  async isStationDropdownVisible(): Promise<boolean> {
    return await this.advancedSearch.isClosestStationDropdownVisible();
  }

  async isOnlineLabelVisible(): Promise<boolean> {
    return await this.advancedSearch.isOnlineLabelVisible();
  }

  async isAgeLabelVisible(): Promise<boolean> {
    return await this.advancedSearch.isAgeLabelVisible();
  }

  async isCategoryLabelVisible(): Promise<boolean> {
    return await this.advancedSearch.isCategoryLabelVisible();
  }
  async getFirstClubCard(): Promise<ClubCardComponent> {
    return await this.clubList.getClubCardByIndex(0);
  }
}
