import type { Locator } from '@playwright/test';
import { BaseComponent } from './base-component';

export class TaskCardComponent extends BaseComponent {
  private readonly cardLink: Locator;
  private readonly taskImage: Locator;
  private readonly taskName: Locator;
  private readonly detailsLink: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.cardLink = this.root.locator('a.content');
    this.taskImage = this.root.locator('img.day-image');
    this.taskName = this.root.locator('.name');
    this.detailsLink = this.root.locator('.details');
  }

  getRootLocator(): Locator {
    return this.root;
  }

  async getTaskName(): Promise<string> {
    return (await this.taskName.textContent())?.trim() || '';
  }

  async clickTask(): Promise<void> {
    await this.cardLink.click();
  }
}
