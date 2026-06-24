import type { Locator, Page } from '@playwright/test';
import { FilterClubListComponent } from '@/components/filters/filter-club-list-component';
import { ClubBannerTitleComponent } from '@/components/club/club-banner-title-component';
import { AdvancedSearchComponent } from '@/components/filters/advanced-search-component';
import { ListClubCardComponent } from '@/components/club/list-club-card-component';
import { ClubCategory } from '@/data/club-category';
import { CitiesUser } from '@/data/cities-user';
import { ClubCardComponent } from '@/components/club/club-card-component';
import { BasePage } from '@/pages/base-page';
import { DropdownComponent } from '@/components/common/dropdown-component';
import { TagsComponent } from '@/components/common/tags-component';
import * as allure from 'allure-js-commons';

export class ClubPage extends BasePage {
  private readonly filterClubListLocator: Locator;
  private readonly clubBannerTitleLocator: Locator;
  private readonly advancedSearchLocator: Locator;
  private readonly listCardLocator: Locator;
  private readonly firstClubLink: Locator;
  private readonly cardLocator: Locator;

  protected clubBannerTitle: ClubBannerTitleComponent;
  protected advancedSearch: AdvancedSearchComponent;
  protected clubList: ListClubCardComponent;
  protected filterClubList: FilterClubListComponent;

  constructor(page: Page) {
    super(page);
    this.clubBannerTitleLocator = page.locator("//div[@class='city-name-box']");
    this.advancedSearchLocator = page.locator("//div[@class='ant-layout-sider-children']");
    this.listCardLocator = page.locator('main.club-list-content');
    this.firstClubLink = this.listCardLocator.locator('a[href*="/club/"]').first();
    this.clubBannerTitle = new ClubBannerTitleComponent(this.clubBannerTitleLocator);
    this.advancedSearch = new AdvancedSearchComponent(this.advancedSearchLocator);
    this.clubList = new ListClubCardComponent(this.listCardLocator);
    this.filterClubListLocator = this.page.locator("xpath=//*[@class='club-list-control']");
    this.cardLocator = this.page.locator('div.ant-card');
    this.filterClubList = new FilterClubListComponent(this.filterClubListLocator);
  }

  async navigate(): Promise<void> {
    await allure.step('Navigate to clubs page', async (): Promise<void> => {
      await this.page.goto('/clubs');
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.listCardLocator.waitFor({ state: 'visible' });
  }

  async openFirstClubPage(): Promise<void> {
    await allure.step('Open first club page', async (): Promise<void> => {
      await this.firstClubLink.waitFor({ state: 'visible' });
      await this.firstClubLink.click();
    });
  }

  async searchByText(text: string): Promise<ClubPage> {
    return await allure.step(`Search clubs by text "${text}"`, async (): Promise<ClubPage> => {
      await this.searchBar.fillSearchInput(text);
      await this.searchBar.clickSearchButton();
      await this.waitUntilCardLoads();
      return this;
    });
  }

  async filterByCity(city: CitiesUser): Promise<ClubPage> {
    return await allure.step(`Filter clubs by city "${city}"`, async (): Promise<ClubPage> => {
      await this.advancedSearch.selectCity(city);
      return this;
    });
  }

  async getFirstCategory(): Promise<string> {
    const searchInput: DropdownComponent = await this.searchBar.clickSearchInput();
    return await searchInput.getFirstOptionText();
  }

  async getClubList(): Promise<ClubCardComponent[]> {
    return await this.clubList.getClubs();
  }

  async filterByDistrict(district: string): Promise<ClubPage> {
    return await allure.step(
      `Filter clubs by district "${district}"`,
      async (): Promise<ClubPage> => {
        await this.advancedSearch.selectDistrict(district);
        return this;
      }
    );
  }

  async filterByStation(station: string): Promise<ClubPage> {
    return await allure.step(
      `Filter clubs by closest station "${station}"`,
      async (): Promise<ClubPage> => {
        await this.advancedSearch.selectClosestStation(station);
        return this;
      }
    );
  }

  async getClubCount(): Promise<number> {
    await this.cardLocator.first().waitFor({ state: 'visible' });
    return await this.clubList.getClubCardCount();
  }

  async waitForClubsResponse(): Promise<void> {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/clubs/search?clubName') && response.status() === 200
    );
  }

  async filterByAge(age: string): Promise<ClubPage> {
    return await allure.step(`Filter clubs by age "${age}"`, async (): Promise<ClubPage> => {
      await this.advancedSearch.fillAgeField(age);
      return this;
    });
  }

  async filterByCategory(category: ClubCategory): Promise<ClubPage> {
    return await allure.step(
      `Filter clubs by category "${category}"`,
      async (): Promise<ClubPage> => {
        await this.advancedSearch.clickCategoryButton(category);
        return this;
      }
    );
  }

  async enableRemoteFilter(): Promise<ClubPage> {
    return await allure.step('Enable remote filter', async (): Promise<ClubPage> => {
      await this.advancedSearch.clickRemoteButton();
      return this;
    });
  }

  async switchToClubMode(): Promise<ClubPage> {
    return await allure.step('Switch to club mode', async (): Promise<ClubPage> => {
      await this.advancedSearch.clickClubRadioButton();
      return this;
    });
  }

  async switchToCentreMode(): Promise<ClubPage> {
    return await allure.step('Switch to centre mode', async (): Promise<ClubPage> => {
      await this.advancedSearch.clickCentreRadioButton();
      return this;
    });
  }

  async isClubModeSelected(): Promise<boolean> {
    return await this.advancedSearch.isClubRadioButtonChecked();
  }

  async isCentreModeSelected(): Promise<boolean> {
    return await this.advancedSearch.isCentreRadioButtonChecked();
  }

  async waitUntilCityLoads(city: CitiesUser): Promise<void> {
    return await allure.step(
      `Wait until clubs for city "${city}" are loaded`,
      async (): Promise<void> => {
        await this.page.waitForResponse(
          (response) =>
            response.url().includes('/api/clubs/search') &&
            response.url().includes(encodeURIComponent(city)) &&
            response.status() === 200
        );
      }
    );
  }

  async isRemoteFilterChecked(): Promise<boolean> {
    return await this.advancedSearch.isRemoteButtonChecked();
  }

  async getClubTags(): Promise<TagsComponent> {
    return await this.clubList.getClubTags();
  }

  async isTagEmpty(): Promise<boolean> {
    const tags: TagsComponent = await this.getClubTags();
    return await tags.isTagEmpty();
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

  async selectSearchBarHint(text: string): Promise<void> {
    await allure.step(`Select search bar hint "${text}"`, async (): Promise<void> => {
      const searchInput: DropdownComponent = await this.searchBar.clickSearchInput();
      await searchInput.select(text);
      await this.waitUntilCardLoads();
    });
  }

  async selectFirstCategory(): Promise<void> {
    await allure.step('Select first category from search bar', async (): Promise<void> => {
      const searchInput: DropdownComponent = await this.searchBar.clickSearchInput();
      await searchInput.clickFirstOption();
      await this.waitUntilCardLoads();
    });
  }

  async getAllCategories(): Promise<string[]> {
    return await allure.step(
      'Select all categories from search bar',
      async (): Promise<string[]> => {
        const searchInput: DropdownComponent = await this.searchBar.clickSearchInput();
        const categories: string[] = await searchInput.getOptionsText();
        for (const category of categories) {
          await searchInput.select(category);
          await this.waitUntilCardLoads();
        }
        return categories;
      }
    );
  }

  async waitUntilCardLoads(): Promise<void> {
    await this.cardLocator.first().waitFor({ state: 'visible' });
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

  async selectCity(city: CitiesUser): Promise<ClubPage> {
    return await allure.step(`Select city "${city}" in header`, async (): Promise<ClubPage> => {
      await this.header.selectCity(city);
      return this;
    });
  }

  async getBanner(): Promise<ClubBannerTitleComponent> {
    return await allure.step(
      'Get club banner title component',
      async (): Promise<ClubBannerTitleComponent> => {
        return this.clubBannerTitle;
      }
    );
  }

  async hasCitySelected(city: CitiesUser): Promise<void> {
    return await allure.step(
      `Check if city "${city}" is selected in header`,
      async (): Promise<void> => {
        await this.header.hasCitySelected(city);
      }
    );
  }

  async getAllAddresses(): Promise<string[]> {
    return await allure.step(
      'Get all club addresses from the list',
      async (): Promise<string[]> => {
        const addresses: string[] = [];
        const totalPages: number = await this.pagination.getTotalPages();
        for (let i: number = 1; i <= totalPages; i++) {
          await this.pagination.goToPage(i);
          await this.waitUntilCardLoads();

          const clubs: ClubCardComponent[] = await this.getClubList();
          for (const club of clubs) {
            const address: string = await club.getClubAddress();
            addresses.push(address);
          }
          const isLastPage: boolean = await this.pagination.isNextDisabled();
          if (isLastPage) {
            break;
          }
        }
        return addresses;
      }
    );
  }

  async getAllTags(): Promise<string[]> {
    const tags: string[] = [];
    const totalPages: number = await this.pagination.getTotalPages();

    for (let i: number = 1; i <= totalPages; i++) {
      await this.pagination.goToPage(i);
      await this.waitUntilCardLoads();

      const tagsComponent: TagsComponent = await this.clubList.getClubTags();
      const pageTags: string[] = await tagsComponent.getAllCategoryTags();
      tags.push(...pageTags);

      const isLast = await this.pagination.isNextDisabled();
      if (isLast) break;
    }

    return tags;
  }

  async selectCategory(category: ClubCategory): Promise<ClubPage> {
    await this.advancedSearch.clickCategoryButton(category);
    return this;
  }
  async isCaregoryButtonChecked(category: ClubCategory): Promise<boolean> {
    return await allure.step(
      `Check if category button "${category}" is checked`,
      async (): Promise<boolean> => {
        return await this.advancedSearch.isCategoryButtonChecked(category);
      }
    );
  }
}
