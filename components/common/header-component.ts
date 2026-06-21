import { expect, type Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { DropdownComponent } from '@/components/common/dropdown-component';
import { CitiesUser } from '@/data';
import * as allure from 'allure-js-commons';
import { Challenges } from '@/data/challenges';

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
  private readonly challengeDropdownMenu: Locator;
  private readonly challengeDropdownItems: Locator;
  private readonly dropdownLocator: Locator;
  private readonly challengeDropdownLocator: Locator;

  private challengeDropdown: DropdownComponent;
  private dropdown: DropdownComponent;

  constructor(root: Locator) {
    super(root);

    this.logo = this.root.locator('.logo');
    this.clubsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Гуртки' });
    this.challengeLink = this.root.getByText('Челендж');
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
    this.challengeDropdownMenu = this.page.locator(
      'ul.ant-menu-sub.ant-menu-vertical[id*="challenge"]'
    );
    this.challengeDropdownItems = this.page.locator(
      'ul.ant-menu-sub.ant-menu-vertical[id*="challenge"] .subItem'
    );
    this.dropdownLocator = this.root.page().locator('ul.ant-dropdown-menu');
    this.dropdown = new DropdownComponent(this.dropdownLocator);
    this.challengeDropdownLocator = this.root
      .page()
      .locator('div.ant-menu-submenu-popup')
      .filter({ visible: true });
    this.challengeDropdown = new DropdownComponent(this.challengeDropdownLocator);
  }

  async clickClubs(): Promise<void> {
    await allure.step('Click on "Гуртки" link', async () => {
      await this.clubsLink.click();
    });
  }

  async clickChallenge(): Promise<void> {
    await allure.step('Click on "Челендж" link', async (): Promise<void> => {
      await this.challengeLink.click({ force: true });
    });
  }
  async selectChallenge(challenge: Challenges): Promise<void> {
    await this.clickChallenge();
    await this.challengeDropdownLocator.waitFor({ state: 'visible' });
    await this.challengeDropdown.selectChallengeOption(challenge);
  }

  async clickNews(): Promise<void> {
    await allure.step('Click on "Новини" link', async () => {
      await this.newsLink.click();
    });
  }

  async clickAboutUs(): Promise<void> {
    await allure.step('Click on "Про нас" link', async () => {
      await this.aboutUsLink.click();
    });
  }

  async clickServices(): Promise<void> {
    await allure.step('Click on "Послуги українською" link', async () => {
      await this.servicesLink.click();
    });
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

  async clickChallengeDropdownItem(itemText: string): Promise<void> {
    await allure.step(`Click on "${itemText}" in challenge dropdown`, async () => {
      const menuItem = this.challengeDropdownItems.filter({ hasText: itemText });
      await menuItem.waitFor({ state: 'visible', timeout: 10000 });
      await menuItem.click();
    });
  }

  async waitForChallengeDropdown(): Promise<void> {
    await allure.step('Wait for challenge dropdown to appear', async () => {
      await this.challengeDropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
    });
  }
}
