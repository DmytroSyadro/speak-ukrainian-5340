import { BaseComponent } from '../base-component';
import type { Locator } from '@playwright/test';

export class MapComponent extends BaseComponent {
  private readonly markers: Locator;
  private readonly zoomInButton: Locator;
  private readonly zoomOutButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.markers = this.root.locator('.cluster');
    this.zoomInButton = this.root.locator("button[title='Zoom in']");
    this.zoomOutButton = this.root.locator("button[title='Zoom out']");
  }
  async getMarkersCount(): Promise<number> {
    return await this.markers.count();
  }
  async isMarkersVisible(): Promise<boolean> {
    return await this.markers.isVisible();
  }
  async clickZoomInButton(): Promise<void> {
    await this.zoomInButton.click();
  }
  async clickZoomOutButton(): Promise<void> {
    await this.zoomOutButton.click();
  }
}
