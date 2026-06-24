import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { FaqItemComponent } from '@/components/faq/faq-item-component';

import * as allure from 'allure-js-commons';

export class FaqComponent extends BaseComponent {
  private readonly itemLocators: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.itemLocators = this.root.locator('.ant-collapse-item');
  }

  async getItems(): Promise<FaqItemComponent[]> {
    return await allure.step('Get all FAQ items', async (): Promise<FaqItemComponent[]> => {
      const count = await this.itemLocators.count();
      const items: FaqItemComponent[] = [];
      for (let i = 0; i < count; i++) {
        items.push(new FaqItemComponent(this.itemLocators.nth(i)));
      }
      return items;
    });
  }

  async getItemByIndex(index: number): Promise<FaqItemComponent> {
    return await allure.step(
      `Get FAQ item by index ${index}`,
      async (): Promise<FaqItemComponent> => {
        return new FaqItemComponent(this.itemLocators.nth(index));
      }
    );
  }

  async getItemsCount(): Promise<number> {
    return await allure.step('Get FAQ items count', async (): Promise<number> => {
      return await this.itemLocators.count();
    });
  }

  async getAllTitles(): Promise<string[]> {
    return await allure.step('Get all FAQ titles', async (): Promise<string[]> => {
      const items = await this.getItems();
      return Promise.all(items.map((item) => item.getTitle()));
    });
  }
}
