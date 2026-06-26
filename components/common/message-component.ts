import { expect, type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class MessageComponent extends BaseComponent {
  private readonly successMessage: Locator;
  private readonly validationErrors: Locator;

  static getRootLocator(page: Page): Locator {
    return page.locator('body');
  }

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.successMessage = this.root.locator('.ant-message-success');
    this.validationErrors = this.root.locator('.ant-form-item-has-error');
  }

  async expectSuccessMessageVisible(text: string): Promise<void> {
    await expect(this.successMessage.filter({ hasText: text })).toBeVisible({ timeout: 15000 });
  }

  async expectNoValidationErrors(): Promise<void> {
    await expect(this.validationErrors).toHaveCount(0);
  }
}
