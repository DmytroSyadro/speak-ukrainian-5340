import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ChallengeTaskPage extends BasePage {
  private readonly taskImage: Locator;
  private readonly taskHeader: Locator;
  private readonly headerContentText: Locator;
  private readonly mainContentText: Locator;
  private readonly videoIframes: Locator;
  private readonly allContentLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.taskImage = page.locator('img.task-image');
    this.taskHeader = page.locator('.task-header');
    this.headerContentText = page.locator('.header-content .task-text');
    this.mainContentText = page.locator('.task-content .task-text');
    this.videoIframes = page.locator('iframe.ql-video');
    this.allContentLinks = page.locator('.task-text a');
  }

  async goto(id: number): Promise<void> {
    await this.page.goto(`/challenges/task/${id}`);
  }

  async getTaskHeader(): Promise<string> {
    return (await this.taskHeader.innerText()).trim();
  }

  async getHeaderContentText(): Promise<string> {
    return (await this.headerContentText.innerText()).trim();
  }

  async getMainContentText(): Promise<string> {
    return (await this.mainContentText.innerText()).trim();
  }

  async getContentLinks(): Promise<string[]> {
    const count = await this.allContentLinks.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await this.allContentLinks.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  async getIframeUrls(): Promise<string[]> {
    const count = await this.videoIframes.count();
    const urls: string[] = [];
    for (let i = 0; i < count; i++) {
      const src = await this.videoIframes.nth(i).getAttribute('src');
      if (src) urls.push(src);
    }
    return urls;
  }

  async playVideo(index: number): Promise<void> {
    const count = await this.videoIframes.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Video iframe index out of range: ${index} (count: ${count})`);
    }

    const frame = this.page.frameLocator('iframe.ql-video').nth(index);

    const isPlaying = await frame
      .locator('.html5-video-player.playing-mode')
      .isVisible()
      .catch(() => false);

    if (!isPlaying) {
      await frame.locator('.ytp-play-button').click();
    }
  }

  async pauseVideo(index: number): Promise<void> {
    const count = await this.videoIframes.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Video iframe index out of range: ${index} (count: ${count})`);
    }

    const frame = this.page.frameLocator('iframe.ql-video').nth(index);

    const isPlaying = await frame
      .locator('.html5-video-player.playing-mode')
      .isVisible()
      .catch(() => false);

    if (isPlaying) {
      await frame.locator('.ytp-play-button').click();
    }
  }
}
