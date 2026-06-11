import { Locator, Page } from '@playwright/test';
import { BaseModal } from './base-modal';

const SELECTORS = {
  root: "//div[@class='ant-modal-content']",
  tagsRoot: ".//div[contains(@class, 'categories')]",
  number: ".//*[@class='contact-name' and contains(text(), '+')]",
  link: ".//*[@class='contact-name']/a",
  download: ".//button[contains(@class, 'download-button')]",
  moreAboutClub: ".//button[contains(@class, 'more-button')]",
  address: ".//div[@class='address']/span[@class='text']",
  title: ".//div[@class='club-name']",
  description: "//div[@class='description']",
  clubFullStars: 'li.ant-rate-star-full',
  clubHalfStars: 'li.ant-rate-star-half',
  age: ".//span[@class='years']",
} as const;

export class ClubModal extends BaseModal {
  private readonly root: Locator;
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
  //private tags: TagsComponent;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator(SELECTORS.root);
    this.clubFullStars = this.root.locator(SELECTORS.clubFullStars);
    this.clubHalfStars = this.root.locator(SELECTORS.clubHalfStars);
    this.addressText = this.root.locator(SELECTORS.address);
    this.titleText = this.root.locator(SELECTORS.title);
    this.descriptionText = this.root.locator(SELECTORS.description);
    this.linkText = this.root.locator(SELECTORS.link);
    this.downloadButton = this.root.locator(SELECTORS.download);
    this.moreAboutClubButton = this.root.locator(SELECTORS.moreAboutClub);
    this.age = this.root.locator(SELECTORS.age);
    this.contactNumbers = this.root.locator(SELECTORS.number);
  }
  async getRoot(): Promise<Locator> {
    return this.root;
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
  }
}
