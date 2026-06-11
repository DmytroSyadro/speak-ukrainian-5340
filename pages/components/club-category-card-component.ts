import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base-component';

export class ClubCategoryCardComponent extends BaseComponent {
  private categoryTitle: Locator;
  private categoryDescription: Locator;
  private seeMoreButton: Locator;
  private cardRoot: Locator;

  constructor(page: Page, rootSelector: string, categoryTitle: string) {
    super(page, rootSelector);

    this.cardRoot = this.root.filter({ hasText: categoryTitle });

    this.categoryTitle = this.cardRoot.locator('.name');
    this.categoryDescription = this.cardRoot.locator('.description');
    this.seeMoreButton = this.cardRoot.locator('.details');
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
