import type { Locator, Page } from '@playwright/test';
import { TagsComponent } from '@/components/common/tags-component';
import { BaseModal } from '@/modals/base-modal';

export class ClubModal extends BaseModal {
  private static readonly ROOT_SELECTOR = "//div[@class='ant-modal-content']";
  private readonly clubFullStars: Locator;
  private readonly clubHalfStars: Locator;
  private readonly addressText: Locator;
  private readonly titleText: Locator;
  private readonly descriptionText: Locator;
  private readonly linkText: Locator;
  private readonly downloadButton: Locator;
  private readonly moreAboutClubButton: Locator;
  private readonly age: Locator;
  private readonly contactNumbers: Locator;
  private readonly clubTagsLocator: Locator;

  private clubTags: TagsComponent;

  constructor(page: Page) {
    super(page);
    this.clubFullStars = this.root.locator('li.ant-rate-star-full');
    this.clubHalfStars = this.root.locator('li.ant-rate-star-half');
    this.addressText = this.root.locator("xpath=.//div[@class='address']/span[@class='text']");
    this.titleText = this.root.locator("xpath=.//div[@class='club-name']");
    this.descriptionText = this.root.locator("xpath=//div[@class='description']");
    this.linkText = this.root.locator("xpath=.//*[@class='contact-name']/a");
    this.downloadButton = this.root.locator("xpath=.//button[contains(@class, 'download-button')]");
    this.moreAboutClubButton = this.root.locator(
      "xpath=.//button[contains(@class, 'more-button')]"
    );
    this.age = this.root.locator("xpath=.//span[@class='years']");
    this.contactNumbers = this.root.locator(
      "xpath=.//*[@class='contact-name' and contains(text(), '+')]"
    );
    this.clubTagsLocator = this.root.locator("xpath=.//div[contains(@class, 'categories')]");
    this.clubTags = new TagsComponent(this.clubTagsLocator);
  }
  async getRoot(): Promise<Locator> {
    return this.page.locator(ClubModal.ROOT_SELECTOR);
  }
  async isVisible(): Promise<boolean> {
    return (await this.getRoot()).isVisible();
  }
  async getClubRating(): Promise<number> {
    const fullStars = await this.clubFullStars.count();
    const halfStars = await this.clubHalfStars.count();

    if (fullStars === 0 && halfStars === 0) return 0;

    return fullStars + halfStars * 0.5;
  }
  async getClubAddress(): Promise<string> {
    return this.addressText.innerText();
  }
  async getClubTitle(): Promise<string> {
    return this.titleText.innerText();
  }
  async getClubDescription(): Promise<string> {
    return this.descriptionText.innerText();
  }
  async getClubLink(): Promise<string> {
    return this.linkText.innerText();
  }
  async downloadClub(): Promise<void> {
    await this.downloadButton.click();
  }
  async clickMoreAboutClub(): Promise<void> {
    await this.moreAboutClubButton.click();
  }
  async getAllContactNumbers(): Promise<string[]> {
    return await this.contactNumbers.allInnerTexts();
  }
  async hasNumberOfContactNumbers(text: string): Promise<boolean> {
    return (await this.getAllContactNumbers()).includes(text);
  }
  async getEarlyAge(): Promise<string> {
    const text = await this.age.innerText();
    return text.split(' ')[1];
  }

  async getLateAge(): Promise<string> {
    const text = await this.age.innerText();
    return text.split(' ')[3];
  } //
}
