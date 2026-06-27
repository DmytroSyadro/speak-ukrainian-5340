import { expect, type Locator, type Page, type Route } from '@playwright/test';
import { BaseModal } from '@/modals/base-modal';
import { AddLocationModal } from '@/modals/add-location-modal';
import { DropdownComponent } from '@/components/common/dropdown-component';

export class AddClubModal extends BaseModal {
  private readonly nameInput: Locator;
  private readonly ageFromInput: Locator;
  private readonly ageToInput: Locator;
  private readonly centerDropdownTrigger: Locator;
  private readonly addLocationButton: Locator;
  private readonly contactPhoneInput: Locator;
  private readonly logoUploadInput: Locator;
  private readonly descriptionTextarea: Locator;
  private readonly nextStepButton: Locator;
  private readonly finishButton: Locator;
  private readonly checkboxWrappers: Locator;
  private readonly timePickerInputs: Locator;
  private readonly stepTitles: Locator;
  private readonly uploadSuccessIndicator: Locator;

  // Absorbed Time Picker Locators
  private readonly timePickerDropdownLocator: Locator;
  private readonly timePickerHourColumn: Locator;
  private readonly timePickerMinuteColumn: Locator;
  private readonly timePickerOkButton: Locator;

  private readonly dropdown: DropdownComponent;

  constructor(page: Page) {
    const rootLocator = page.locator('div.modal-add-club .ant-modal-content').filter({
      has: page.locator('div.add-club-header').filter({ hasText: 'Додати гурток' }),
    });
    super(page, rootLocator);

    this.nameInput = this.root.locator('#basic_name');
    this.ageFromInput = this.root.locator('#basic_ageFrom');
    this.ageToInput = this.root.locator('#basic_ageTo');
    this.centerDropdownTrigger = this.root
      .locator('.ant-select')
      .filter({ has: this.page.locator('#basic_centerId') })
      .locator('.ant-select-selector');
    this.addLocationButton = this.root.locator('span.add-club-location');
    this.contactPhoneInput = this.root.locator('#basic_contactТелефон');
    this.logoUploadInput = this.root.locator('#basic_urlLogo');
    this.descriptionTextarea = this.root.locator('#basic_description');
    this.nextStepButton = this.root.getByRole('button', { name: 'Наступний крок', exact: true });
    this.finishButton = this.root.getByRole('button', { name: 'Завершити', exact: true });
    this.checkboxWrappers = this.root.locator('label.ant-checkbox-wrapper');
    this.timePickerInputs = this.root.locator('.ant-picker-input input');
    this.stepTitles = this.root.locator('.ant-steps-item-active .ant-steps-item-title');
    this.uploadSuccessIndicator = this.root.locator('.ant-upload-list-item-done');

    this.timePickerDropdownLocator = this.page.locator(
      '.ant-picker-dropdown:not(.ant-picker-dropdown-hidden)'
    );
    this.timePickerHourColumn = this.timePickerDropdownLocator
      .locator('.ant-picker-time-panel-column')
      .nth(0)
      .locator('.ant-picker-time-panel-cell-inner');
    this.timePickerMinuteColumn = this.timePickerDropdownLocator
      .locator('.ant-picker-time-panel-column')
      .nth(1)
      .locator('.ant-picker-time-panel-cell-inner');
    this.timePickerOkButton = this.timePickerDropdownLocator
      .locator('button.ant-btn-primary')
      .filter({ hasText: 'OK' });

    this.dropdown = new DropdownComponent(
      this.page.locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
    );
  }

  async getRoot(): Promise<Locator> {
    return this.root;
  }

  async setupPayloadSanitizer(): Promise<void> {
    const routeHandlers: Record<string, (route: Route) => Promise<void>> = {
      POST: async (route: Route) => {
        const postData = route.request().postData() || '{}';
        const sanitizedData = postData.replace(/::/g, ':').replace(/"key":[\d.]+,?/g, '');
        await route.continue({ postData: sanitizedData });
      },
      default: async (route: Route) => {
        await route.continue();
      },
    };

    await this.page.route('**/api/club', async (route) => {
      const handler = routeHandlers[route.request().method()] || routeHandlers['default'];
      await handler(route);
    });
  }

  async fillClubName(name: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.nameInput.press('Tab');
  }

  async checkCategory(categoryName: string): Promise<void> {
    const checkboxLabel = this.checkboxWrappers.filter({ hasText: categoryName });
    await checkboxLabel.scrollIntoViewIfNeeded();
    await checkboxLabel.click();
  }

  async fillAgeBounds(from: number, to: number): Promise<void> {
    await this.ageFromInput.fill(from.toString());
    await this.ageFromInput.press('Tab');

    await this.ageToInput.fill(to.toString());
    await this.ageToInput.press('Tab');
  }

  async selectCenter(centerName: string): Promise<void> {
    await this.centerDropdownTrigger.scrollIntoViewIfNeeded();
    await this.centerDropdownTrigger.click();
    await this.dropdown.waitForVisible();
    await this.dropdown.select(centerName);
    await this.dropdown.waitForHidden();
  }

  async clickNextStep(expectedStepTitle: string): Promise<void> {
    await this.nextStepButton.scrollIntoViewIfNeeded();
    await expect(this.nextStepButton).toBeEnabled();
    await this.nextStepButton.click();
    await this.stepTitles
      .filter({ hasText: expectedStepTitle })
      .first()
      .waitFor({ state: 'visible' });
  }

  async clickAddLocationButton(): Promise<AddLocationModal> {
    await this.addLocationButton.scrollIntoViewIfNeeded();
    await this.addLocationButton.click();
    const locationModal = new AddLocationModal(this.page);
    await (await locationModal.getRoot()).waitFor({ state: 'visible' });
    return locationModal;
  }

  async checkWorkday(dayName: string): Promise<void> {
    const dayRow = this.root.locator('.checkbox-item').filter({ hasText: dayName });
    await dayRow.locator('.ant-checkbox').scrollIntoViewIfNeeded();
    await dayRow.locator('.ant-checkbox').click();
  }

  async selectWorkingHours(
    startHour: string,
    startMinute: string,
    endHour: string,
    endMinute: string
  ): Promise<void> {
    await this.timePickerInputs.nth(0).scrollIntoViewIfNeeded();
    await this.timePickerInputs.nth(0).click();
    await this.timePickerDropdownLocator.waitFor({ state: 'visible' });

    await this.timePickerHourColumn.filter({ hasText: startHour }).click();
    await this.timePickerMinuteColumn.filter({ hasText: startMinute }).first().click();

    await this.timePickerInputs.nth(1).scrollIntoViewIfNeeded();
    await this.timePickerInputs.nth(1).click();

    await this.timePickerHourColumn.filter({ hasText: endHour }).click();
    await this.timePickerMinuteColumn.filter({ hasText: endMinute }).first().click();

    await this.timePickerOkButton.scrollIntoViewIfNeeded();
    await expect(this.timePickerOkButton).toBeEnabled();
    await this.timePickerOkButton.click();
    await this.timePickerDropdownLocator.waitFor({ state: 'hidden' });
  }

  async fillContactPhone(phone: string): Promise<void> {
    await this.contactPhoneInput.fill(phone);
    await this.contactPhoneInput.press('Tab');
  }

  async uploadLogo(filePath: string): Promise<void> {
    const uploadPromise = this.page.waitForResponse(
      (response) => response.url().includes('upload') && response.status() === 200
    );

    await this.logoUploadInput.setInputFiles(filePath);
    await uploadPromise;
    await this.uploadSuccessIndicator.waitFor({ state: 'visible' });
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionTextarea.fill(description);
    await this.descriptionTextarea.press('Tab');
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.scrollIntoViewIfNeeded();
    await expect(this.finishButton).toBeEnabled();
    await this.finishButton.click();
  }
}
