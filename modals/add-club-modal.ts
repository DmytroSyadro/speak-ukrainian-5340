import type { Locator, Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';
import { AddClubFormComponent } from '@/components/club/add-club-form-component';

export class AddClubModal extends BaseModal {
  public readonly form: AddClubFormComponent;

  constructor(page: Page) {
    const rootLocator = AddClubFormComponent.getRootLocator(page);
    super(page, rootLocator);
    this.form = new AddClubFormComponent(this.root);
  }
}
