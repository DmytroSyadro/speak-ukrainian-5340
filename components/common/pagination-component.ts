import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class PaginationComponent extends BaseComponent {
  private readonly previousButton: Locator;
  private readonly nextButton: Locator;
  private readonly pageNumberLocator: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.previousButton = this.root.getByRole('button', { name: 'left' });
    this.nextButton = this.root.getByRole('button', { name: 'right' });
    this.pageNumberLocator = this.root.locator('.ant-pagination-item-active');
  }

  async clickPrevious(): Promise<void> {
    await this.previousButton.click();
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async getActivePageNumber(): Promise<number> {
    const pageNumberText = await this.pageNumberLocator.innerText();
    return parseInt(pageNumberText, 10);
  }

  async getTotalPages(): Promise<number> {
    const pageNumbers = await this.root.locator('.ant-pagination-item').allInnerTexts();

    if (pageNumbers.length === 0) return 0;

    const lastPageText = pageNumbers[pageNumbers.length - 1];
    return parseInt(lastPageText, 10);
  }

  async isPreviousDisabled(): Promise<boolean> {
    return await this.previousButton.isDisabled();
  }

  async isNextDisabled(): Promise<boolean> {
    return (await this.nextButton.getAttribute('aria-disabled')) === 'true';
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.root.getByText(pageNumber.toString(), { exact: true });
    await pageButton.click();
  }
}
