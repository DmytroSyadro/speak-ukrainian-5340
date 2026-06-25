import type { Page } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';
import { AddLocationFormComponent } from '@/components/club/add-location-form-component';

export class AddLocationModal extends BaseModal {
  public readonly form: AddLocationFormComponent;

  constructor(page: Page) {
    const rootLocator = AddLocationFormComponent.getRootLocator(page);
    super(page, rootLocator);
    this.form = new AddLocationFormComponent(this.root);
  }
}
