import { expect, type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class TimePickerComponent extends BaseComponent {
  private readonly hourColumn: Locator;
  private readonly minuteColumn: Locator;
  private readonly okButton: Locator;

  static getRootLocator(page: Page): Locator {
    return page.locator('.ant-picker-dropdown:not(.ant-picker-dropdown-hidden)');
  }

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.hourColumn = this.root
      .locator('.ant-picker-time-panel-column')
      .nth(0)
      .locator('.ant-picker-time-panel-cell-inner');
    this.minuteColumn = this.root
      .locator('.ant-picker-time-panel-column')
      .nth(1)
      .locator('.ant-picker-time-panel-cell-inner');
    this.okButton = this.root.locator('button.ant-btn-primary').filter({ hasText: 'OK' });
  }

  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }

  async selectTime(hour: string, minute: string): Promise<void> {
    await this.hourColumn.filter({ hasText: hour }).click();
    await this.minuteColumn.filter({ hasText: minute }).first().click();
  }

  async clickOkButton(): Promise<void> {
    await expect(this.okButton).toBeEnabled();
    await this.okButton.click();
  }
}
