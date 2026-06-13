import type { Locator } from '@playwright/test';
import { BaseComponent } from './base-component';
import { TaskCardComponent } from './task-card-component';

export class ChallengeTasksCarouselComponent extends BaseComponent {
  private readonly sectionLabel: Locator;
  private readonly prevArrow: Locator;
  private readonly nextArrow: Locator;
  private readonly carouselDots: Locator;
  private readonly taskCards: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.sectionLabel = this.root.locator('h2.label');
    this.prevArrow = this.root.locator('.arrows-prev');
    this.nextArrow = this.root.locator('.arrows-next');
    this.carouselDots = this.root.locator('.slick-dots li button');
    this.taskCards = this.root.locator('.primitive-card');
  }

  async clickNextArrow(): Promise<void> {
    await this.nextArrow.click();
  }

  async clickPrevArrow(): Promise<void> {
    await this.prevArrow.click();
  }

  async clickCarouselDot(index: number): Promise<void> {
    const count = await this.carouselDots.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Carousel dot index out of range: ${index} (count: ${count})`);
    }
    await this.carouselDots.nth(index).click();
  }

  async getAllTaskCards(): Promise<TaskCardComponent[]> {
    await this.taskCards.first().waitFor({ state: 'attached' });

    const count = await this.taskCards.count();
    const cards: TaskCardComponent[] = [];
    for (let i = 0; i < count; i++) {
      cards.push(new TaskCardComponent(this.taskCards.nth(i)));
    }
    return cards;
  }

  async getTaskCardByIndex(index: number): Promise<TaskCardComponent> {
    await this.taskCards.first().waitFor({ state: 'attached' });
    const count = await this.taskCards.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Task card index out of range: ${index} (count: ${count})`);
    }
    return new TaskCardComponent(this.taskCards.nth(index));
  }

  async getTaskCardByName(name: string): Promise<TaskCardComponent | undefined> {
    const cards = await this.getAllTaskCards();
    for (const card of cards) {
      if ((await card.getTaskName()) === name) {
        return card;
      }
    }
    return undefined;
  }
}
