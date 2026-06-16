import { BaseModal } from './base-modal';
import type { Locator, Page } from '@playwright/test';
import { ClubItemListComponent } from '../components/club-item-list-component';
import { FilterMapComponent } from '../components/filter-map-component';
import { MapComponent } from '../components/map-component';

export class MapModal extends BaseModal {
  private static readonly ROOT_SELECTOR = "//div[@class='ant-modal-content']";
  private readonly closeButton: Locator;
  private readonly mapLocator: Locator;
  private readonly filtersLocator: Locator;
  private readonly clubsLocator: Locator;

  private map: MapComponent;
  private filters: FilterMapComponent;
  private clubs: ClubItemListComponent;

  constructor(page: Page) {
    super(page);
    this.root = page.locator(MapModal.ROOT_SELECTOR);
    this.closeButton = this.root.locator("xpath=.//span[@class='ant-modal-close-x']");
    this.mapLocator = this.root.locator("xpath=.//div[@class='gm-style']");
    this.filtersLocator = this.root.locator("xpath=.//div[@class='selectBlock']");
    this.clubsLocator = this.root.locator("xpath=.//div[@class='clubList']");

    this.map = new MapComponent(this.mapLocator);
    this.filters = new FilterMapComponent(this.filtersLocator);
    this.clubs = new ClubItemListComponent(this.clubsLocator);
  }
  async getRoot(): Promise<Locator> {
    return this.page.locator(MapModal.ROOT_SELECTOR);
  }
  async isVisible(): Promise<boolean> {
    return (await this.getRoot()).isVisible();
  }
  async getClubsCount(): Promise<number> {
    return await this.clubs.getClubItemCount();
  } //
}
