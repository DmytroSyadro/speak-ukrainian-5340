import type { Locator, Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';
import { SignInFormComponent } from '@/components/common/sign-in-form-component';

export class SignInModal extends BaseModal {
  public readonly form: SignInFormComponent;

  constructor(page: Page) {
    const rootLocator = SignInFormComponent.getRootLocator(page);
    super(page, rootLocator);
    this.form = new SignInFormComponent(this.root);
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.form.fillEmail(email);
    await this.form.fillPassword(password);
  }

  async fillEmail(email: string): Promise<void> {
    await this.form.fillEmail(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.form.fillPassword(password);
  }

  async getEmail(): Promise<string> {
    return this.form.getEmail();
  }

  async getPassword(): Promise<string> {
    return this.form.getPassword();
  }

  async submit(): Promise<void> {
    await this.form.clickSubmit();
  }

  async forgotPassword(): Promise<void> {
    await this.form.forgotPassword();
  }

  async loginWithGoogle(): Promise<void> {
    await this.form.loginWithGoogle();
  }

  async loginWithFacebook(): Promise<void> {
    await this.form.loginWithFacebook();
  }

  async close(): Promise<void> {
    await this.form.close();
  }

  async login(email: string, password: string): Promise<void> {
    await this.form.login(email, password);
  }
}
