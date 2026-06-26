import { expect, type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '@/components/base-component';

export class SignInFormComponent extends BaseComponent {
  static getRootLocator(page: Page): Locator {
    return page.locator('div.ant-modal.modal-login[role="dialog"]');
  }

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly googleSignInButton: Locator;
  private readonly facebookSignInButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly closeButton: Locator;

  constructor(rootLocator: Locator) {
    super(rootLocator);
    this.emailInput = this.root.locator('#basic_email');
    this.passwordInput = this.root.locator('#basic_password');
    this.submitButton = this.root.getByRole('button', { name: /увійти/i });
    this.googleSignInButton = this.root.locator('a[href*="google"]');
    this.facebookSignInButton = this.root.locator('a[href*="facebook"]');
    this.forgotPasswordLink = this.root.getByRole('link', { name: /забули пароль?/i });
    this.closeButton = this.page.locator('button.ant-modal-close, button[aria-label="Close"]');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.emailInput.press('Tab');
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Tab');
  }

  async getEmail(): Promise<string> {
    return this.emailInput.inputValue();
  }

  async getPassword(): Promise<string> {
    return this.passwordInput.inputValue();
  }

  async clickSubmit(): Promise<void> {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async forgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async loginWithGoogle(): Promise<void> {
    await this.googleSignInButton.click();
  }

  async loginWithFacebook(): Promise<void> {
    await this.facebookSignInButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}
