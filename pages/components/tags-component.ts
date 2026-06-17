import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class TagsComponent extends BaseComponent {
  private readonly categoryName: Locator;

  constructor(rootSelector: Locator) {
    super(rootSelector);
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
    return await this.categoryName.allInnerTexts();
  }
  async hasCategoryTag(tag: string): Promise<boolean> {
    const tags: string[] = await this.getAllCategoryTags();
    return tags.includes(tag);
  }
  async hasTags(): Promise<boolean> {
    return (await this.categoryName.count()) > 0;
  }
  async isTagEmpty(): Promise<boolean> {
    return (await this.categoryName.count()) === 0;
  }
}
