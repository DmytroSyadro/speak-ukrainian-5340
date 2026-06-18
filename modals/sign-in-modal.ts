import { Locator, Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';

export class SignInModal extends BaseModal {
  private static readonly ROOT_SELECTOR = 'div.ant-modal.modal-login[role="dialog"]';

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly googleSignInButton: Locator;
  private readonly facebookSignInButton: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('#basic_email');
    this.passwordInput = this.page.locator('#basic_password');
    this.googleSignInButton = this.page.locator('a[href*="google"]');
    this.facebookSignInButton = this.page.locator('a[href*="facebook"]');
    this.submitButton = this.page.getByRole('button', { name: /увійти/i });
    this.forgotPasswordLink = this.page.getByRole('link', { name: /забули пароль?/i });
    this.closeButton = this.page.locator('button.ant-modal-close, button[aria-label="Close"]');
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(SignInModal.ROOT_SELECTOR);
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

  async loginWithGoogle() {
    await this.googleSignInButton.click();
  }

  async loginWithFacebook() {
    await this.facebookSignInButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.submit();

    await this.page
      .locator('div.ant-modal.modal-login[role="dialog"]')
      .waitFor({ state: 'hidden' });
  }
}
