import type { Locator } from '@playwright/test';
import { MapModal } from '@/modals/map-modal';
import { BaseComponent } from '@/components/base-component';
import * as allure from 'allure-js-commons';

export class ClubBannerTitleComponent extends BaseComponent {
  private readonly title: Locator;
  private readonly mapButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.title = this.root.locator('xpath=.//*[@class="city-name"]');
    this.mapButton = this.root.locator('xpath=.//*[contains(@class, "show-map-button")]');
  }

  async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  async clickMapButton(): Promise<MapModal> {
    return await allure.step('Click map button', async (): Promise<MapModal> => {
      await this.mapButton.click();
      return new MapModal(this.page);
    });
  }

  async isMapButtonVisible(): Promise<boolean> {
    return await this.mapButton.isVisible();
  }

  async isMapButtonEnabled(): Promise<boolean> {
    return await this.mapButton.isEnabled();
  }

  async getCityName(): Promise<string> {
    return await allure.step('Get city name from banner title', async (): Promise<string> => {
      const cityName = await this.title.innerText();
      return cityName.split(' ').pop() ?? '';
    });
  }
}
