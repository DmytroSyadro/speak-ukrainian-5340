import { Locator, Page } from '@playwright/test';
import { BaseModal } from './base-modal';

export class CommentModal extends BaseModal {
  private static readonly ROOT_SELECTOR = 'div.ant-modal.comment-modal[role="dialog"]';

  private readonly commentTab: Locator;
  private readonly complaintTab: Locator;
  private readonly ratingStars: Locator;
  private readonly commentTextarea: Locator;
  private readonly submitButton: Locator;
  private readonly authorNameField: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator(CommentModal.ROOT_SELECTOR);
    this.commentTab = this.root.getByRole('tab', { name: /^коментар$/i });
    this.complaintTab = this.root.getByRole('tab', { name: /^скарга$/i });
    this.ratingStars = this.root.locator('ul.ant-rate li.ant-rate-star');
    this.commentTextarea = this.root.locator('textarea');
    this.submitButton = this.root.locator('button.do-comment-button');
    this.authorNameField = this.root.locator('.comment-fields .comment-input-box').first();
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(CommentModal.ROOT_SELECTOR);
  }

  async isCommentTabVisible(): Promise<boolean> {
    return this.commentTab.isVisible();
  }

  async isComplaintTabVisible(): Promise<boolean> {
    return this.complaintTab.isVisible();
  }

  async hoverRatingStar(starIndex: number): Promise<void> {
    await this.ratingStars.nth(starIndex - 1).hover();
  }

  async clickRatingStar(starIndex: number): Promise<void> {
    await this.ratingStars.nth(starIndex - 1).click();
  }

  async getHighlightedStarCount(): Promise<number> {
    return this.root
      .locator('ul.ant-rate li.ant-rate-star-active, ul.ant-rate li.ant-rate-star-full')
      .count();
  }

  async clickCommentTextarea(): Promise<void> {
    await this.commentTextarea.click();
  }

  async fillComment(text: string): Promise<void> {
    await this.commentTextarea.fill(text);
  }

  async getCommentText(): Promise<string> {
    return this.commentTextarea.inputValue();
  }

  async getAuthorName(): Promise<string> {
    return this.authorNameField.inputValue();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
