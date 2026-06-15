import { BaseComponent } from './base-component';
import type { Locator } from '@playwright/test';

export class FilterClubListComponent extends BaseComponent {
  private readonly sortLabel: Locator;
  private readonly sortAlphabet: Locator;
  private readonly sortByRating: Locator;
  private readonly sortArrowUp: Locator;
  private readonly sortArrowDown: Locator;
  private readonly listViewButton: Locator;
  private readonly gridViewButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.sortLabel = this.root.locator('.control-sort-label');
    this.sortAlphabet = this.root.locator('.control-sort-option').getByText('за алфавітом');
    this.sortByRating = this.root.locator('.control-sort-option').getByText('за рейтингом');
    this.sortArrowUp = this.root.locator('.anticon-arrow-up');
    this.sortArrowDown = this.root.locator('.anticon-arrow-down');
    this.listViewButton = this.root.locator("xpath=.//input[@value='LIST']/parent::span");
    this.gridViewButton = this.root.locator("xpath=.//input[@value='BLOCK']/parent::span");
  }
  async getSortLabel(): Promise<string> {
    return this.sortLabel.innerText();
  }
  async clickSortByAlphabet(): Promise<void> {
    await this.sortAlphabet.click();
  }
  async clickSortByRating(): Promise<void> {
    await this.sortByRating.click();
  }
  async isSortArrowUpVisible(): Promise<boolean> {
    return this.sortArrowUp.isVisible();
  }
  async isSortArrowDownVisible(): Promise<boolean> {
    return this.sortArrowDown.isVisible();
  }
  async clickListViewButton(): Promise<void> {
    await this.listViewButton.click();
  }
  async clickGridViewButton(): Promise<void> {
    await this.gridViewButton.click();
  }
  async isGridViewButtonVisible(): Promise<boolean> {
    return this.gridViewButton.isVisible();
  }
  async isListViewButtonVisible(): Promise<boolean> {
    return this.listViewButton.isVisible();
  }
}
