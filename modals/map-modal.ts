import type { Locator, Page } from '@playwright/test';
import { ClubItemListComponent } from '@/components/club/club-item-list-component';
import { FilterMapComponent } from '@/components/filters/filter-map-component';
import { MapComponent } from '@/components/map/map-component';
import { BaseModal } from '@/modals/base-modal';
import { ClubPage } from '@/pages';
import { ClubInfoPopupComponent } from '@/components/club/club-info-popup-component';

export class MapModal extends BaseModal {
  private static readonly ROOT_SELECTOR = "//div[@class='ant-modal-content']";
  private readonly closeButton: Locator;
  private readonly mapLocator: Locator;
  private readonly filtersLocator: Locator;
  private readonly clubsLocator: Locator;
  private readonly clubInfoLocator: Locator;

  private clubInfoPopup: ClubInfoPopupComponent;
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
    this.clubInfoLocator = this.root.locator('div.markItem');

    this.clubInfoPopup = new ClubInfoPopupComponent(this.clubInfoLocator);
    this.map = new MapComponent(this.mapLocator);
    this.filters = new FilterMapComponent(this.filtersLocator);
    this.clubs = new ClubItemListComponent(this.clubsLocator);
  }
  async getRoot(): Promise<Locator> {
    return this.page.locator(MapModal.ROOT_SELECTOR);
  }
  async clickCloseButton(): Promise<ClubPage> {
    await this.closeButton.click();
    return new ClubPage(this.page);
  }
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
  async getClubsCount(): Promise<number> {
    return await this.clubs.getClubItemCount();
  }
  async getClubs(): Promise<string[]> {
    return this.clubs.getAllClubItems();
  }
  async getFilter(): Promise<FilterMapComponent> {
    return this.filters;
  }
  async getMap(): Promise<MapComponent> {
    return this.map;
  }
  async clickClusterByIndex(index: number): Promise<MapModal> {
    await this.map.getMarkerByIndex(index).click();
    return new MapModal(this.page);
  }
  async clickClusterMarkerByIndex(index: number): Promise<MapModal> {
    await this.map.getClusterByIndex(index).click();
    return new MapModal(this.page);
  }
  async getClubInfoPopup(): Promise<ClubInfoPopupComponent> {
    return this.clubInfoPopup;
  }
}
