import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base-component';

export class SignInModal extends BaseComponent {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleButton: Locator;
  readonly facebookButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page, 'div.ant-modal.modal-login[role="dialog"]');
    this.emailInput = this.root.locator('#basic_email');
    this.passwordInput = this.root.locator('#basic_password');
    
    this.submitButton = this.root.getByRole('button', { name: /увійти/i });
    this.forgotPasswordLink = this.root.getByRole('link', { name: /забули пароль?/i });
    
    this.googleButton = this.root.locator('a[href*="google"]');
    this.facebookButton = this.root.locator('a[href*="facebook"]');

    this.closeButton = this.root.locator('button.ant-modal-close, button[aria-label="Close"]');
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async forgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
