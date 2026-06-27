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
  private readonly addClubButton: Locator;

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
    this.addClubButton = this.root.locator('button.add-club-button');
  }

  async clickClubs(): Promise<void> {
    await allure.step('Click on "Гуртки" link', async (): Promise<void> => {
      await this.clubsLink.click();
    });
  }

  async clickChallenge(): Promise<void> {
    await allure.step('Click on "Челендж" link', async (): Promise<void> => {
      await this.challengeLink.click();
    });
  }
  async selectChallenge(challenge: Challenges): Promise<void> {
    await this.clickChallenge();
    await this.challengeDropdownLocator.waitFor({ state: 'visible' });
    await this.challengeDropdown.selectChallengeOption(challenge);
  }

  async clickNews(): Promise<void> {
    await allure.step('Click on "Новини" link', async (): Promise<void> => {
      await this.newsLink.click();
    });
  }

  async clickAboutUs(): Promise<void> {
    await allure.step('Click on "Про нас" link', async (): Promise<void> => {
      await this.aboutUsLink.click();
    });
  }

  async clickServices(): Promise<void> {
    await allure.step('Click on "Послуги українською" link', async (): Promise<void> => {
      await this.servicesLink.click();
    });
  }

  async selectCity(city: CitiesUser): Promise<void> {
    await allure.step(`Select city "${city}" from header dropdown`, async (): Promise<void> => {
      await this.citySelector.click();
      await this.dropdown.selectMenuOption(city);
    });
  }

  async hasCitySelected(city: CitiesUser): Promise<void> {
    await expect(this.citySelector).toHaveText(city);
  }

  async openUserMenu(): Promise<void> {
    await allure.step('Open user menu', async (): Promise<void> => {
      await this.userMenuButton.click();
    });
  }

  async clickUserMenuItem(itemRegex: RegExp): Promise<void> {
    await allure.step(`Click user menu item matching "${itemRegex}"`, async (): Promise<void> => {
      await this.openUserMenu();
      const menuItem = this.userMenuItems.filter({ hasText: itemRegex }).first();
      await menuItem.waitFor({ state: 'visible' });
      await menuItem.click();
    });
  }

  async isUserMenuButtonVisible(): Promise<boolean> {
    return this.userMenuButton.isVisible();
  }

  async expectUserIsLoggedIn(): Promise<void> {
    await expect(this.userMenuButton).toBeVisible();
    await this.openUserMenu();
    await expect(this.userMenuItems.filter({ hasText: /вийти/i })).toBeVisible();
  }

  async expectAuthButtonsHidden(): Promise<void> {
    await expect(this.userMenuItems.filter({ hasText: /увійти/i })).toHaveCount(0);
    await expect(this.userMenuItems.filter({ hasText: /зареєструват/i })).toHaveCount(0);
  }

  async getSelectedCity(): Promise<string> {
    return (await this.citySelector.textContent()) || '';
  }

  async clickAdvancedSearch(): Promise<void> {
    await allure.step('Click advanced search button', async (): Promise<void> => {
      await this.advancedSearchButton.click();
    });
  }

  async clickLogo(): Promise<void> {
    await allure.step('Click on logo', async (): Promise<void> => {
      await this.logo.click();
    });
  }

  async fillSearch(text: string): Promise<void> {
    await allure.step(`Fill search input with "${text}"`, async (): Promise<void> => {
      await this.searchInput.fill(text);
    });
  }

  async clickSearchButton(): Promise<void> {
    await allure.step('Click search button', async (): Promise<void> => {
      await this.searchButton.click();
    });
  }

  async search(text: string): Promise<void> {
    await allure.step(`Search for "${text}"`, async (): Promise<void> => {
      await this.fillSearch(text);
      await this.clickSearchButton();
    });
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
    await allure.step(`Click on "${itemText}" in challenge dropdown`, async (): Promise<void> => {
      const menuItem = this.challengeDropdownItems.filter({ hasText: itemText });
      await menuItem.waitFor({ state: 'visible', timeout: 10000 });
      await menuItem.click();
    });
  }

  async waitForChallengeDropdown(): Promise<void> {
    await this.challengeDropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickAddClubButton(): Promise<void> {
    await allure.step('Click on "Додати гурток" button', async (): Promise<void> => {
      await this.addClubButton.click();
    });
  }
}
