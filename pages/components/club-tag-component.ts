import { BaseComponent } from './base-component.js';
import { Locator, Page } from '@playwright/test';

export class ClubTagComponent extends BaseComponent {
  private categoryName: Locator;
  private categoryAmount: Locator;
  constructor(page: Page, rootSelector: string | Locator) {
    super(page, rootSelector);
    this.categoryName = this.root.locator('.name');
    this.categoryAmount = this.root.locator('span.ant-tag');
  }
  async getCategoryName(): Promise<string> {
    return this.categoryName.innerText();
  }
  async getCategoryAmount(): Promise<number> {
    return await this.categoryAmount.count();
  }
  async isCategoryVisible(): Promise<boolean> {
    return this.categoryName.isVisible();
  }
  async getCategoryTagByIndex(index: number): Promise<string> {
    return this.categoryName.nth(index).innerText();
  }
  async getAllCategoryTags(): Promise<string[]> {
    const count = await this.categoryAmount.count();
    const tags: string[] = [];

    for (let iii = 0; iii < count; iii++) {
      tags.push(await this.categoryName.nth(iii).innerText());
    }

    return tags;
  }
  async hasCategoryTag(tag: string): Promise<boolean> {
    const tags = await this.getAllCategoryTags();
    return tags.includes(tag);
  }
  async hasTags(): Promise<boolean> {
    return (await this.categoryAmount.count()) > 0;
  }
}
