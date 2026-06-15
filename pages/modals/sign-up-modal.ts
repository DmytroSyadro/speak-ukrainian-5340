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
  private readonly root: Locator;
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly googleSignInButton: Locator;
  private readonly facebookSignInButton: Locator;
  private readonly registerButton: Locator;
  private readonly CloseButton: Locator;
  private readonly visitorTab: Locator;
  private readonly managerTab: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator(SignUpModal.ROOT_SELECTOR);
    this.lastNameInput = this.root.locator('#lastName');
    this.firstNameInput = this.root.locator('#firstName');
    this.phoneInput = this.root.locator('#phone');
    this.emailInput = this.root.locator('#email');
    this.passwordInput = this.root.locator('#password');
    this.confirmPasswordInput = this.root.locator('#confirm');
    this.registerButton = this.root.getByRole('button', {
      name: /зареєструватись|зареєструватися/i,
    });
    this.googleSignInButton = this.root.locator('a[href*="google"]');
    this.facebookSignInButton = this.root.locator('a[href*="facebook"]');
    this.CloseButton = this.root.locator('button[aria-label="Close"]');
    this.visitorTab = this.root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /відвідувач/i })
      .first();
    this.managerTab = this.root
      .locator('label.ant-radio-button-wrapper')
      .filter({ hasText: /керівник/i })
      .first();
  }

  async getRoot(): Promise<Locator> {
    return this.root;
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
    await this.googleSignInButton.click();
  }

  async registerWithFacebook() {
    await this.facebookSignInButton.click();
  }

  async submit() {
    await this.registerButton.click();
  }

  async close() {
    await this.CloseButton.click();
  }
}
