import { BaseComponent } from './base-component.js';
import { Locator, Page } from '@playwright/test';

export class TagsComponent extends BaseComponent {
  private readonly categoryName: Locator;

  constructor(page: Page, rootSelector: Locator) {
    super(page, rootSelector);
    this.categoryName = this.root.locator('.ant-tag .name');
  }
  async getCategoryName(): Promise<string> {
    return this.categoryName.innerText();
  }
  async getCategoryAmount(): Promise<number> {
    return await this.categoryName.count();
  }
  async isCategoryVisible(): Promise<boolean> {
    return this.categoryName.isVisible();
  }
  async getCategoryTagByIndex(index: number): Promise<string> {
    return this.categoryName.nth(index).innerText();
  }
  async getAllCategoryTags(): Promise<string[]> {
    const count = await this.categoryName.count();
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
    return (await this.categoryName.count()) > 0;
  }
  async isTagEmpty(): Promise<boolean> {
    return (await this.categoryName.count()) === 0;
  }
}
