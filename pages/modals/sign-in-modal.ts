import { Locator, Page } from '@playwright/test';
import { BaseModal } from './base-modal';

export class SignInModal extends BaseModal {
  private static readonly ROOT_SELECTOR = 'div.ant-modal.modal-login[role="dialog"]';

  constructor(page: Page) {
    super(page);
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(SignInModal.ROOT_SELECTOR);
  }

  async fillCredentials(email: string, password: string) {
    const root = await this.getRoot();
    await root.locator('#basic_email').fill(email);
    await root.locator('#basic_password').fill(password);
  }

  async submit() {
    const root = await this.getRoot();
    await root.getByRole('button', { name: /увійти/i }).click();
  }

  async forgotPassword() {
    const root = await this.getRoot();
    await root.getByRole('link', { name: /забули пароль?/i }).click();
  }

  async loginWithGoogle() {
    const root = await this.getRoot();
    await root.locator('a[href*="google"]').click();
  }

  async loginWithFacebook() {
    const root = await this.getRoot();
    await root.locator('a[href*="facebook"]').click();
  }

  async close() {
    const root = await this.getRoot();
    await root.locator('button.ant-modal-close, button[aria-label="Close"]').click();
  }
}
