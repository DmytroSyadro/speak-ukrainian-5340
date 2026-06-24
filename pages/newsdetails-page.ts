import { Locator, Page } from '@playwright/test';
import { OtherNewsComponent } from '@/components/news/other-news-component';
import { BasePage } from '@/pages/base-page';

export class NewsDetailsPage extends BasePage {
  private readonly newsTitle: Locator;
  private readonly newsDescription: Locator;
  private readonly newsImage: Locator;
  private readonly newsDate: Locator;
  private readonly helpButton: Locator;
  public readonly otherNews: OtherNewsComponent;
  //initializing the social media component

  constructor(page: Page) {
    super(page);
    this.newsTitle = page.locator('#major-title');
    this.newsDescription = page.locator('#description');
    this.newsImage = page.locator('.image');
    this.newsDate = page.locator('#date');
    this.helpButton = page.locator('button.donate-button');
    this.otherNews = new OtherNewsComponent(page.locator('.other-news'));
  }
  async getNewsTitle(): Promise<string | null> {
    return this.newsTitle.textContent();
  }

  async getNewsDescription(): Promise<string | null> {
    return this.newsDescription.textContent();
  }

  async clickHelpButton(): Promise<void> {
    await this.helpButton.click();
  }

  getHelpButtonLocator(): Locator {
    return this.helpButton;
  }
}
