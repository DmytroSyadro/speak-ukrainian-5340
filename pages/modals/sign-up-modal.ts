import { Locator, Page } from '@playwright/test';
import { BaseModal } from './base-modal';

interface RegistrationData {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignUpModal extends BaseModal {
  private static readonly ROOT_SELECTOR = 'div.ant-modal.modal-registration[role="dialog"]';

  constructor(page: Page) {
    super(page);
  }

  async getRoot(): Promise<Locator> {
    return this.page.locator(SignUpModal.ROOT_SELECTOR);
  }

  async selectVisitorTab() {
    const root = await this.getRoot();
    await root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /відвідувач/i })
      .first()
      .click();
  }

  async selectManagerTab() {
    const root = await this.getRoot();
    await root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /керівник/i })
      .first()
      .click();
  }

  async fillRegistration(data: RegistrationData) {
    const root = await this.getRoot();
    await root.locator('#lastName').fill(data.lastName);
    await root.locator('#firstName').fill(data.firstName);
    await root.locator('#phone').fill(data.phone);
    await root.locator('#email').fill(data.email);
    await root.locator('#password').fill(data.password);
    await root.locator('#confirm').fill(data.confirmPassword);
  }

  async registerWithGoogle() {
    const root = await this.getRoot();
    await root.locator('a[href*="google"]').click();
  }

  async registerWithFacebook() {
    const root = await this.getRoot();
    await root.locator('a[href*="facebook"]').click();
  }

  async submit() {
    const root = await this.getRoot();
    await root.getByRole('button', { name: /зареєструватись|зареєструватися/i }).click();
  }

  async close() {
    const root = await this.getRoot();
    await root.locator('button[aria-label="Close"]').click();
  }
}
