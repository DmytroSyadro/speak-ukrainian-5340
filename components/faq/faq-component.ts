import type { Locator } from '@playwright/test';
import { BaseComponent } from '../base-component';
import { FaqItemComponent } from './faq-item-component';

export class FaqComponent extends BaseComponent {
  private readonly itemLocators: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.itemLocators = this.root.locator('.ant-collapse-item');
  }

  async getItems(): Promise<FaqItemComponent[]> {
    const count = await this.itemLocators.count();
    const items: FaqItemComponent[] = [];
    for (let i = 0; i < count; i++) {
      items.push(new FaqItemComponent(this.itemLocators.nth(i)));
    }
    return items;
  }

  async getItemByIndex(index: number): Promise<FaqItemComponent> {
    return new FaqItemComponent(this.itemLocators.nth(index));
  }

  async getItemsCount(): Promise<number> {
    return this.itemLocators.count();
  }

  async getAllTitles(): Promise<string[]> {
    const items = await this.getItems();
    return Promise.all(items.map((item) => item.getTitle()));
  }
}
