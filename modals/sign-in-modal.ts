import { expect, type Locator, type Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';

export class SignInModal extends BaseModal {
  private static readonly ROOT_SELECTOR = 'div.ant-modal.modal-login[role="dialog"]';
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly googleSignInButton: Locator;
  private readonly facebookSignInButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator(SignInModal.ROOT_SELECTOR);

    this.emailInput = this.root.locator('#basic_email');
    this.passwordInput = this.root.locator('#basic_password');
    this.submitButton = this.root.getByRole('button', { name: /увійти/i });
    this.googleSignInButton = this.root.locator('a[href*="google"]');
    this.facebookSignInButton = this.root.locator('a[href*="facebook"]');
    this.forgotPasswordLink = this.root.getByRole('link', { name: /забули пароль?/i });
    this.closeButton = this.page.locator('button.ant-modal-close, button[aria-label="Close"]');
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(SignInModal.ROOT_SELECTOR);
  }

  async waitForVisible(): Promise<void> {
    const locator = await this.getRoot();
    await locator.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    const locator = await this.getRoot();
    await locator.waitFor({ state: 'hidden' });
  }

  async isVisible(): Promise<boolean> {
    const locator = await this.getRoot();
    return locator.isVisible();
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

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}
