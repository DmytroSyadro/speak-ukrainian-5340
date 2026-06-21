import { BaseComponent } from '@/components/base-component';
import type { Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class PaymentFormComponent extends BaseComponent {
  private readonly sumField: Locator;
  private readonly currencyDropdown: Locator;
  private readonly applePayButton: Locator;
  private readonly googlePayButton: Locator;
  private readonly otherPayMethod: Locator;
  private readonly cardField: Locator;
  private readonly expirationField: Locator;
  private readonly cvcField: Locator;
  private readonly nameField: Locator;
  private readonly numberField: Locator;
  private readonly emailField: Locator;
  private readonly payButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.sumField = this.root.locator('#freepay-amount');
    this.currencyDropdown = this.root.locator('#freepay-currency');
    this.applePayButton = this.root.locator('#apple-pay');
    this.googlePayButton = this.root.locator('#gpay-button-online-api-id');
    this.otherPayMethod = this.root.locator('span.other');
    this.cardField = this.root.locator('#cardpay-cardnumber');
    this.expirationField = this.root.locator("xpath=.//*[@id='cardpay-validity']");
    this.cvcField = this.root.locator("xpath=.//*[@id='cardpay-cardsecure']");
    this.nameField = this.root.locator("xpath=.//*[@id='cardpay-cardholder']");
    this.numberField = this.root.locator("xpath=.//*[@id='cardpay-clientphone']");
    this.emailField = this.root.locator("xpath=.//*[@id='cardpay-clientemail']");
    this.payButton = this.root.locator("xpath=.//*[@id='cardpay-submit']");
  }

  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async isHidden(): Promise<boolean> {
    return await this.root.isHidden();
  }

  async getSumField(): Promise<string> {
    return await this.sumField.inputValue();
  }

  async setSumField(value: string): Promise<void> {
    await allure.step(`Set sum field to "${value}"`, async (): Promise<void> => {
      await this.sumField.fill(value);
    });
  }

  async getCurrencyDropdown(): Promise<string> {
    return await this.currencyDropdown.inputValue();
  }

  async setCurrencyDropdown(value: string): Promise<void> {
    await allure.step(`Set currency dropdown to "${value}"`, async (): Promise<void> => {
      await this.currencyDropdown.fill(value);
    });
  }

  async clickApplePayButton(): Promise<void> {
    await allure.step('Click Apple Pay button', async (): Promise<void> => {
      await this.applePayButton.click();
    });
  }

  async clickGooglePayButton(): Promise<void> {
    await allure.step('Click Google Pay button', async (): Promise<void> => {
      await this.googlePayButton.click();
    });
  }

  async clickOtherPayMethod(): Promise<void> {
    await allure.step('Click other payment method', async (): Promise<void> => {
      await this.otherPayMethod.click();
    });
  }

  async getCardField(): Promise<string> {
    return await this.cardField.inputValue();
  }

  async setCardField(value: string): Promise<void> {
    await allure.step('Set card number field', async (): Promise<void> => {
      await this.cardField.fill(value);
    });
  }

  async getExpirationField(): Promise<string> {
    return await this.expirationField.inputValue();
  }

  async setExpirationField(value: string): Promise<void> {
    await allure.step(`Set expiration field to "${value}"`, async (): Promise<void> => {
      await this.expirationField.fill(value);
    });
  }

  async getCvcField(): Promise<string> {
    return await this.cvcField.inputValue();
  }

  async setCvcField(value: string): Promise<void> {
    await allure.step('Set CVC field', async (): Promise<void> => {
      await this.cvcField.fill(value);
    });
  }

  async getNameField(): Promise<string> {
    return await this.nameField.inputValue();
  }

  async setNameField(value: string): Promise<void> {
    await allure.step(`Set name field to "${value}"`, async (): Promise<void> => {
      await this.nameField.fill(value);
    });
  }

  async getNumberField(): Promise<string> {
    return await this.numberField.inputValue();
  }

  async setNumberField(value: string): Promise<void> {
    await allure.step(`Set phone number field to "${value}"`, async (): Promise<void> => {
      await this.numberField.fill(value);
    });
  }

  async getEmailField(): Promise<string> {
    return await this.emailField.inputValue();
  }

  async setEmailField(value: string): Promise<void> {
    await allure.step(`Set email field to "${value}"`, async (): Promise<void> => {
      await this.emailField.fill(value);
    });
  }

  async clickPayButton(): Promise<void> {
    await allure.step('Click pay button', async (): Promise<void> => {
      await this.payButton.click();
    });
  }

  async isPayButtonEnabled(): Promise<boolean> {
    return await this.payButton.isEnabled();
  }

  async isPayButtonVisible(): Promise<boolean> {
    return await this.payButton.isVisible();
  }

  async isEmailFieldVisible(): Promise<boolean> {
    return await this.emailField.isVisible();
  }

  async isNumberFieldVisible(): Promise<boolean> {
    return await this.numberField.isVisible();
  }

  async isNameFieldVisible(): Promise<boolean> {
    return await this.nameField.isVisible();
  }

  async isCvcFieldVisible(): Promise<boolean> {
    return await this.cvcField.isVisible();
  }

  async isExpirationFieldVisible(): Promise<boolean> {
    return await this.expirationField.isVisible();
  }

  async isCardFieldVisible(): Promise<boolean> {
    return await this.cardField.isVisible();
  }

  async isOtherPayMethodVisible(): Promise<boolean> {
    return await this.otherPayMethod.isVisible();
  }

  async isGooglePayButtonVisible(): Promise<boolean> {
    return await this.googlePayButton.isVisible();
  }

  async isApplePayButtonVisible(): Promise<boolean> {
    return await this.applePayButton.isVisible();
  }
}
