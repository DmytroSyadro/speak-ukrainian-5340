import type { Locator } from '@playwright/test';
import { BaseComponent } from '../base-component';

export class HeaderComponent extends BaseComponent {
  private readonly logo: Locator;
  private readonly clubsLink: Locator;
  private readonly challengeLink: Locator;
  private readonly newsLink: Locator;
  private readonly aboutUsLink: Locator;
  private readonly servicesLink: Locator;
  private readonly citySelector: Locator;
  private readonly userMenuButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly advancedSearchButton: Locator;

  constructor(root: Locator) {
    super(root);

    this.logo = this.root.locator('.logo');
    this.clubsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Гуртки' });
    this.challengeLink = this.root.locator('.nav-menu a').filter({ hasText: 'Челендж' });
    this.newsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Новини' });
    this.aboutUsLink = this.root.locator('.nav-menu a').filter({ hasText: 'Про нас' });
    this.servicesLink = this.root.locator('.nav-menu a').filter({ hasText: 'Послуги українською' });
    this.citySelector = this.root.locator('.ant-dropdown-trigger');
    this.userMenuButton = this.root.locator('.ant-dropdown-trigger:has(.anticon-user)');
    this.searchInput = this.root.locator('.ant-select-selection-search-input, .search-input');
    this.searchButton = this.root.locator('svg[data-icon="search"]');
    this.advancedSearchButton = this.root.locator('svg[data-icon="control"]');
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

  async selectCity(): Promise<void> {
    await this.citySelector.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
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
