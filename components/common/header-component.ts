import { expect, type Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { DropdownComponent } from '@/components/common/dropdown-component';
import { CitiesUser } from '@/data';

export class HeaderComponent extends BaseComponent {
  private readonly logo: Locator;
  private readonly clubsLink: Locator;
  private readonly challengeLink: Locator;
  private readonly newsLink: Locator;
  private readonly aboutUsLink: Locator;
  private readonly servicesLink: Locator;
  private readonly citySelector: Locator;
  private readonly userMenuButton: Locator;
  private readonly userMenuItems: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly advancedSearchButton: Locator;
  private readonly dropdownLocator: Locator;

  private dropdown: DropdownComponent;

  constructor(root: Locator) {
    super(root);

    this.logo = this.root.locator('.logo');
    this.clubsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Гуртки' });
    this.challengeLink = this.root.locator('.nav-menu a').filter({ hasText: 'Челендж' });
    this.newsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Новини' });
    this.aboutUsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Про нас' });
    this.servicesLink = this.root.locator('.nav-menu a').filter({ hasText: 'Послуги українською' });
    this.citySelector = this.root.locator('.ant-dropdown-trigger.city');
    this.userMenuButton = this.root.locator('.ant-dropdown-trigger:has(.anticon-user)');
    this.userMenuItems = this.page
      .locator('ul.ant-dropdown-menu[role="menu"]')
      .getByRole('menuitem');
    this.searchInput = this.root.locator('.ant-select-selection-search-input, .search-input');
    this.searchButton = this.root.locator('svg[data-icon="search"]');
    this.advancedSearchButton = this.root.locator('svg[data-icon="control"]');
    this.dropdownLocator = this.root.page().locator('ul.ant-dropdown-menu');
    this.dropdown = new DropdownComponent(this.dropdownLocator);
  }

  async clickClubs(): Promise<void> {
    await this.clubsLink.click();
  }

  async clickChallenge(): Promise<void> {
    await this.challengeLink.click();
  }

  async clickNews(): Promise<void> {
    await this.newsLink.click();
  }

  async clickAboutUs(): Promise<void> {
    await this.aboutUsLink.click();
  }

  async clickServices(): Promise<void> {
    await this.servicesLink.click();
  }

  async selectCity(city: CitiesUser): Promise<void> {
    await this.citySelector.click();
    await this.dropdown.selectMenuOption(city);
  }

  async hasCitySelected(city: CitiesUser): Promise<void> {
    await expect(this.citySelector).toHaveText(city);
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  async clickUserMenuItem(itemRegex: RegExp): Promise<void> {
    await this.openUserMenu();
    const menuItem = this.userMenuItems.filter({ hasText: itemRegex }).first();
    await menuItem.waitFor({ state: 'visible' });
    await menuItem.click();
  }

  async getSelectedCity(): Promise<string> {
    return (await this.citySelector.textContent()) || '';
  }

  async clickAdvancedSearch(): Promise<void> {
    await this.advancedSearchButton.click();
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async fillSearch(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
  }

  async search(text: string): Promise<void> {
    await this.fillSearch(text);
    await this.clickSearchButton();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async getSearchInputValue(): Promise<string> {
    return (await this.searchInput.inputValue()) || '';
  }
}
