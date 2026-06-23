import { BasePage } from '@/pages/base-page';
import type { Locator, Page } from '@playwright/test';
import { PaymentFormComponent } from '@/components/payment/payment-form-component';

interface PaymentFormData {
  sum: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  name: string;
  numberPhone: string;
  email: string;
}

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
  async fillInPaymentForm(data: PaymentFormData): Promise<PaymentPage> {
    await this.paymentForm.setSumField(data.sum);
    await this.paymentForm.setCardField(data.cardNumber);
    await this.paymentForm.setExpirationField(data.expirationDate);
    await this.paymentForm.setCvcField(data.cvc);
    await this.paymentForm.setNameField(data.name);
    await this.paymentForm.setNumberField(data.numberPhone);
    await this.paymentForm.setEmailField(data.email);
    return this;
  }
}
