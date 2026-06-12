import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';
import { ClubBannerTitleComponent } from './components/club-banner-title-component';

export class ClubPage extends BasePage {
  private readonly clubBannerTitleLocator: Locator;

  private clubBannerTitle: ClubBannerTitleComponent;

  constructor(page: Page) {
    super(page);
    this.clubBannerTitleLocator = page.locator("//div[@class='city-name-box']");
    this.clubBannerTitle = new ClubBannerTitleComponent(this.clubBannerTitleLocator);
  }
}
