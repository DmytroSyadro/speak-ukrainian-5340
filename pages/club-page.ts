import type { Locator, Page } from '@playwright/test';
import { FilterClubListComponent } from './components/filter-club-list-component';
import { BasePage } from './base-page';

export class ClubPage extends BasePage {
  private readonly filterClubListLocator: Locator;

  protected filterClubList: FilterClubListComponent;

  constructor(page: Page) {
    super(page);
    this.filterClubListLocator = this.page.locator("//*[@class='club-list-control']");
    this.filterClubList = new FilterClubListComponent(this.filterClubListLocator);
  }
}
