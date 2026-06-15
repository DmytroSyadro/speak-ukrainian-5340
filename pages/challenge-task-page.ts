import type { Locator, Page } from '@playwright/test';
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
    await this.page.goto(`/challenges/task/${id}`, { waitUntil: 'domcontentloaded' });
  }

  async getTaskHeader(): Promise<string> {
    await this.taskHeader.waitFor({ state: 'visible' });
    return (await this.taskHeader.innerText()).trim();
  }

  async getHeaderContentText(): Promise<string> {
    await this.headerContentText.waitFor({ state: 'visible' });
    return (await this.headerContentText.innerText()).trim();
  }

  async getMainContentText(): Promise<string> {
    await this.mainContentText.waitFor({ state: 'visible', timeout: 5000 });
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

    const iframe = this.videoIframes.nth(index);
    await iframe.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // Wait for scrolling & lazy loading

    // const frame = this.page.frameLocator('iframe.ql-video').nth(index);
    const frame = this.page.locator('iframe.ql-video').nth(index).frameLocator('iframe');
    const largePlayBtn = frame.locator('.ytp-large-play-button');

    try {
      await largePlayBtn.waitFor({ state: 'visible', timeout: 3000 });
      await largePlayBtn.click({ force: true });
    } catch {
      await iframe.click({ force: true });
    }
  }

  async pauseVideo(index: number): Promise<void> {
    const count = await this.videoIframes.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Video iframe index out of range: ${index} (count: ${count})`);
    }

    const iframe = this.videoIframes.nth(index);
    await iframe.scrollIntoViewIfNeeded();
    await iframe.click({ force: true });
  }

  async isVideoPlaying(index: number): Promise<boolean> {
    const count = await this.videoIframes.count();
    if (index < 0 || index >= count) {
      throw new RangeError(`Video iframe index out of range: ${index} (count: ${count})`);
    }

    const frame = this.page.frameLocator('iframe.ql-video').nth(index);
    const video = frame.locator('video');

    try {
      await video.waitFor({ state: 'attached', timeout: 10000 });

      for (let i = 0; i < 30; i++) {
        const isPlaying = await video
          .evaluate((vid: HTMLVideoElement) => {
            return !vid.paused && !vid.ended && vid.readyState >= 2 && vid.currentTime > 0;
          })
          .catch(() => false);

        if (isPlaying) return true;

        await this.page.waitForTimeout(500);
      }
      return false;
    } catch {
      return false;
    }
  }
}
