import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { CommentComponent } from '@/components/comment/comment-component';

export class CommentsSectionComponent extends BaseComponent {
  private readonly leaveCommentButton: Locator;
  private readonly comments: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.leaveCommentButton = this.root.locator('button.comment-button');

    this.comments = this.root.locator('.ant-comment.root-comment');
  }

  async clickLeaveComment(): Promise<void> {
    await this.leaveCommentButton.click();
  }

  async getCommentsCount(): Promise<number> {
    await this.root.locator('.comments-container').waitFor({ state: 'visible' });
    return await this.comments.count();
  }

  getCommentByIndex(index: number): CommentComponent {
    return new CommentComponent(this.comments.nth(index));
  }

  getCommentByText(text: string): CommentComponent {
    return new CommentComponent(this.comments.filter({ hasText: text }).first());
  }

  async isCommentsSectionDisplayed(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }
}
