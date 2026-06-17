import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class ClubCategoryCardComponent extends BaseComponent {
  private categoryTitle: Locator;
  private categoryDescription: Locator;
  private seeMoreButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.categoryTitle = this.root.locator('.name');
    this.categoryDescription = this.root.locator('.description');
    this.seeMoreButton = this.root.locator('.details');
  }

  async getCategoryTitle(): Promise<string | null> {
    return await this.categoryTitle.textContent();
  }

  async getCategoryDescription(): Promise<string | null> {
    return await this.categoryDescription.textContent();
  }

  async clickSeeMoreButton(): Promise<void> {
    await this.seeMoreButton.click();
  }
}
