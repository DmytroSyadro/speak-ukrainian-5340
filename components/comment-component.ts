import type { Locator } from '@playwright/test';

import { BaseComponent } from './base-component';

export class CommentComponent extends BaseComponent {
  private readonly authorName: Locator;
  private readonly date: Locator;
  private readonly text: Locator;
  private readonly fullStars: Locator;
  private readonly halfStars: Locator;
  private readonly replyButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.authorName = this.root.locator('.name');
    this.date = this.root.locator('.datetime');
    this.text = this.root.locator('.ant-comment-content-detail p');
    this.fullStars = this.root.locator('li.ant-rate-star-full');
    this.halfStars = this.root.locator('li.ant-rate-star-half');
    this.replyButton = this.root.locator('button.answer-comment');
  }

  async getAuthorName(): Promise<string> {
    return await this.authorName.innerText();
  }

  async getDate(): Promise<string> {
    return await this.date.innerText();
  }

  async getText(): Promise<string> {
    return await this.text.innerText();
  }

  async getRating(): Promise<number> {
    const fullStars = await this.fullStars.count();
    const halfStars = await this.halfStars.count();

    return fullStars + halfStars * 0.5;
  }

  async clickReply(): Promise<void> {
    await this.replyButton.click();
  }

  async isReplyButtonVisible(): Promise<boolean> {
    return await this.replyButton.isVisible();
  }
}
