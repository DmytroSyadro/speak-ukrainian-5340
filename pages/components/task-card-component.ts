import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

const SELECTORS = {
  cardLink: 'a.content',
  taskImage: 'img.day-image',
  taskName: '.name',
  detailsLink: '.details',
};

export class TaskCardComponent extends BaseComponent {
  private readonly cardLink: Locator;
  private readonly taskImage: Locator;
  private readonly taskName: Locator;
  private readonly detailsLink: Locator;

  constructor(page: Page, rootSelector: string) {
    super(page, rootSelector);
    this.cardLink = this.root.locator(SELECTORS.cardLink);
    this.taskImage = this.root.locator(SELECTORS.taskImage);
    this.taskName = this.root.locator(SELECTORS.taskName);
    this.detailsLink = this.root.locator(SELECTORS.detailsLink);
  }

  async getTaskName(): Promise<string> {
    return (await this.taskName.innerText()).trim();
  }

  async clickTask(): Promise<void> {
    await this.cardLink.click();
  }
}
