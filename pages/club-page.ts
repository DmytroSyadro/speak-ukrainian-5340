import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { FilterClubListComponent } from './components/filter-club-list-component';
import { ClubBannerTitleComponent } from './components/club-banner-title-component';
import { AdvancedSearchComponent } from './components/advanced-search-component';
import { ListClubCardComponent } from './components/list-club-card-component';
import { ClubCategory } from '../data/club-category';
import { CitiesUser } from '../data/cities-user';
import { ClubCardComponent } from './components/club-card-component';
import { TagsComponent } from './components/tags-component';

export class ClubPage extends BasePage {
  private readonly filterClubListLocator: Locator;
  private readonly clubBannerTitleLocator: Locator;
  private readonly advancedSearchLocator: Locator;
  private readonly listCardLocator: Locator;

  protected clubBannerTitle: ClubBannerTitleComponent;
  protected advancedSearch: AdvancedSearchComponent;
  protected clubList: ListClubCardComponent;
  protected filterClubList: FilterClubListComponent;

  constructor(page: Page) {
    super(page);
    this.clubBannerTitleLocator = page.locator("xpath=//div[@class='city-name-box']");
    this.advancedSearchLocator = page.locator("xpath=//div[@class='ant-layout-sider-children']");
    this.listCardLocator = page.locator("xpath=//*[contains(@class,'club-list-content')]");
    this.clubBannerTitle = new ClubBannerTitleComponent(this.clubBannerTitleLocator);
    this.advancedSearch = new AdvancedSearchComponent(this.advancedSearchLocator);
    this.clubList = new ListClubCardComponent(this.listCardLocator);
    this.filterClubListLocator = this.page.locator("xpath=//*[@class='club-list-control']");
    this.filterClubList = new FilterClubListComponent(this.filterClubListLocator);
  }
  async navigate(): Promise<void> {
    await this.page.goto('/clubs');
  }

  async waitForPageLoad(): Promise<void> {
    await this.listCardLocator.waitFor({ state: 'visible' });
  }
  async searchByText(text: string): Promise<ClubPage> {
    await this.searchBar.fillSearchInput(text);
    await this.searchBar.pressEnter();
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

  async waitForTitle(title: string): Promise<void> {
    await this.clubList.waitForClubTitle(title);
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
  async getClubTags(): Promise<TagsComponent> {
    return await this.clubList.getClubTags();
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
  async getClubByTitle(title: string): Promise<ClubCardComponent> {
    const card: ClubCardComponent | undefined = await this.clubList.getClubCardByTitle(title);
    if (!card) throw new Error(`Club "${title}" not found`);
    return card;
  }
  async getSearchInput(): Promise<string> {
    return await this.searchBar.getSearchInputText();
  }
}
