import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class MapComponent extends BaseComponent {
  private readonly markers: Locator;
  private readonly zoomInButton: Locator;
  private readonly zoomOutButton: Locator;
  private readonly clusterMarker: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.markers = this.root.locator('div[role="button"][title=""]');
    this.clusterMarker = this.root.locator('div.cluster');
    this.zoomInButton = this.root.locator("button[title='Zoom in']");
    this.zoomOutButton = this.root.locator("button[title='Zoom out']");
  }
  async getMarkersCount(): Promise<number> {
    return await this.markers.count();
  }
  async isMarkersVisible(): Promise<boolean> {
    return await this.markers.isVisible();
  }
  getMarkerByIndex(index: number): Locator {
    return this.markers.nth(index);
  }

  getClusterByIndex(index: number): Locator {
    return this.clusterMarker.nth(index);
  }

  async clickZoomInButton(): Promise<void> {
    await this.zoomInButton.click();
  }
  async clickClusterMarker(): Promise<void> {
    await this.markers.click();
  }
  async clickZoomOutButton(): Promise<void> {
    await this.zoomOutButton.click();
  }
}
