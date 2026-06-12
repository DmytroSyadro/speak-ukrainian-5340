import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';
import { TaskCardComponent } from './task-card-component';

const SELECTORS = {
  sectionLabel: 'h2.label',
  prevArrow: '.arrows-prev',
  nextArrow: '.arrows-next',
  carouselDots: '.slick-dots li button',
  taskCards: '.primitive-card',
};

export class ChallengeTasksCarouselComponent extends BaseComponent {
  private readonly sectionLabel: Locator;
  private readonly prevArrow: Locator;
  private readonly nextArrow: Locator;
  private readonly carouselDots: Locator;
  private readonly taskCards: Locator;

  constructor(page: Page, rootSelector: string) {
    super(page, rootSelector);
    this.sectionLabel = this.root.locator(SELECTORS.sectionLabel);
    this.prevArrow = this.root.locator(SELECTORS.prevArrow);
    this.nextArrow = this.root.locator(SELECTORS.nextArrow);
    this.carouselDots = this.root.locator(SELECTORS.carouselDots);
    this.taskCards = this.root.locator(SELECTORS.taskCards);
  }

  async clickNextArrow(): Promise<void> {
    await this.nextArrow.click();
  }

  async clickPrevArrow(): Promise<void> {
    await this.prevArrow.click();
  }

  async clickCarouselDot(index: number): Promise<void> {
    await this.carouselDots.nth(index).click();
  }

  async getAllTaskCards(): Promise<TaskCardComponent[]> {
    const count = await this.taskCards.count();
    const cards: TaskCardComponent[] = [];
    for (let i = 0; i < count; i++) {
      // Passes a strict string selector by utilizing Playwright's nth index engine
      cards.push(
        new TaskCardComponent(
          this.page,
          `.challenge-day-carousel ${SELECTORS.taskCards} >> nth=${i}`
        )
      );
    }
    return cards;
  }

  async getTaskCardByIndex(index: number): Promise<TaskCardComponent> {
    return new TaskCardComponent(
      this.page,
      `.challenge-day-carousel ${SELECTORS.taskCards} >> nth=${index}`
    );
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
