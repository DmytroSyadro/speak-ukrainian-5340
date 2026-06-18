import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

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
    return (await this.header.textContent()) || '';
  }

  async getContent(): Promise<string> {
    return (await this.content.textContent()) || '';
  }

  async isExpanded(): Promise<boolean> {
    const classAttr = (await this.root.getAttribute('class')) || '';
    return classAttr.includes('ant-collapse-item-active');
  }

  async expand(): Promise<void> {
    if (!(await this.isExpanded())) {
      await this.header.click();
    }
  }

  async collapse(): Promise<void> {
    if (await this.isExpanded()) {
      await this.header.click();
    }
  }

  async toggle(): Promise<void> {
    await this.header.click();
  }

  async getArrow(): Promise<Locator> {
    return this.arrow;
  }

  async isArrowVisible(): Promise<boolean> {
    return this.arrow.isVisible();
  }
}
