import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';
import { CommentComponent } from '@/components/comment/comment-component';

export class CommentsSectionComponent extends BaseComponent {
  private readonly leaveCommentButton: Locator;
  private readonly commentsContainer: Locator;
  private readonly comments: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);

    this.leaveCommentButton = this.root.locator('button.comment-button');
    this.commentsContainer = this.root.locator('.comments-container');
    this.comments = this.root.locator('.ant-comment.root-comment');
  }

  async clickLeaveComment(): Promise<void> {
    await this.leaveCommentButton.click();
  }

  async getCommentsCount(): Promise<number> {
    await this.waitForLocatorVisible(this.commentsContainer);
    await this.waitForLocatorVisible(this.comments.first());
    return await this.comments.count();
  }

  getCommentByIndex(index: number): CommentComponent {
    return new CommentComponent(this.comments.nth(index));
  }

  getCommentByText(text: string): CommentComponent {
    return new CommentComponent(this.comments.filter({ hasText: text }).first());
  }

  async isCommentsSectionDisplayed(): Promise<boolean> {
    try {
      await this.waitForLocatorVisible(this.commentsContainer);
      return true;
    } catch {
      return false;
    }
  }

  async scrollIntoView(): Promise<void> {
    await this.root.scrollIntoViewIfNeeded();
  }
}
