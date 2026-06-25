import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

import * as allure from 'allure-js-commons';

export class FaqItemComponent extends BaseComponent {
  private readonly header: Locator;
  private readonly content: Locator;
  private readonly arrow: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.header = this.root.locator('.ant-collapse-header');
    this.content = this.root.locator('.ant-collapse-content-box');
    this.arrow = this.root.locator('.ant-collapse-arrow');
  }

  async getTitle(): Promise<string> {
    return await allure.step('Get FAQ item title', async (): Promise<string> => {
      return (await this.header.textContent()) || '';
    });
  }

  async getContent(): Promise<string> {
    return await allure.step('Get FAQ item content', async (): Promise<string> => {
      return (await this.content.textContent()) || '';
    });
  }

  async isExpanded(): Promise<boolean> {
    return await allure.step('Check if FAQ item is expanded', async (): Promise<boolean> => {
      const classAttr = (await this.root.getAttribute('class')) || '';
      return classAttr.includes('ant-collapse-item-active');
    });
  }

  async expand(): Promise<void> {
    return await allure.step('Expand FAQ item', async (): Promise<void> => {
      if (!(await this.isExpanded())) {
        await this.header.click();
      }
    });
  }

  async collapse(): Promise<void> {
    return await allure.step('Collapse FAQ item', async (): Promise<void> => {
      if (await this.isExpanded()) {
        await this.header.click();
      }
    });
  }

  async toggle(): Promise<void> {
    return await allure.step('Toggle FAQ item', async (): Promise<void> => {
      await this.header.click();
    });
  }

  async getArrow(): Promise<Locator> {
    return await allure.step('Get FAQ item arrow', async (): Promise<Locator> => {
      return this.arrow;
    });
  }

  async isArrowVisible(): Promise<boolean> {
    return await allure.step('Check if FAQ item arrow is visible', async (): Promise<boolean> => {
      return this.arrow.isVisible();
    });
  }
}
