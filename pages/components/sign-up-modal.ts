import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

interface RegistrationData {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignUpModal extends BaseComponent {
  readonly visitorTab: Locator;
  readonly managerTab: Locator;
  readonly lastNameInput: Locator;
  readonly firstNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly googleButton: Locator;
  readonly facebookButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page, 'div.ant-modal.modal-registration[role="dialog"]');
    this.visitorTab = this.root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /відвідувач/i })
      .first();
    this.managerTab = this.root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /керівник/i })
      .first();

    this.lastNameInput = this.root.locator('#lastName');
    this.firstNameInput = this.root.locator('#firstName');

    this.phoneInput = this.root.locator('#phone');
    this.emailInput = this.root.locator('#email');
    this.passwordInput = this.root.locator('#password');
    this.confirmPasswordInput = this.root.locator('#confirm');

    this.submitButton = this.root.getByRole('button', { name: /зареєструватись|зареєструватися/i });
    this.googleButton = this.root.locator('a[href*="google"]');
    this.facebookButton = this.root.locator('a[href*="facebook"]');

    this.closeButton = this.root.locator('button[aria-label="Close"]');
  }

  async selectVisitorTab() {
    await this.visitorTab.click();
  }

  async selectManagerTab() {
    await this.managerTab.click();
  }

  async fillRegistration(data: RegistrationData) {
    await this.lastNameInput.fill(data.lastName);
    await this.firstNameInput.fill(data.firstName);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async registerWithGoogle() {
    await this.googleButton.click();
  }

  async registerWithFacebook() {
    await this.facebookButton.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
