import { BasePage } from '@/pages/base-page';
import type { Locator, Page } from '@playwright/test';
import { PaymentFormComponent } from '@/components/payment/payment-form-component';

export class PaymentPage extends BasePage {
  private readonly paymentFormLocator: Locator;

  protected paymentForm: PaymentFormComponent;

  constructor(page: Page) {
    super(page);
    this.paymentFormLocator = page.locator('div.payments');
    this.paymentForm = new PaymentFormComponent(this.paymentFormLocator);
  }
  async getPaymentForm(): Promise<PaymentFormComponent> {
    return this.paymentForm;
  }
}
