import type { Page, Locator } from '@playwright/test';

import { NewsCardListComponent } from '@/components/news/news-card-list-component';
import { PaginationComponent } from '@/components/common/pagination-component';
import { ClubsSidebarComponent } from '@/components/club/clubs-sidebar-component';
import { NewsCardComponent } from '@/components/news/news-card-component';
import { BasePage } from '@/pages/base-page';
import { ListClubCardComponent } from '@/components/club/list-club-card-component';
import { ClubCardComponent } from '@/components/club/club-card-component';

export class NewsPage extends BasePage {
  private readonly newsList: Locator;
  private readonly newsListComponent: NewsCardListComponent;
  private readonly clubsSidebar: Locator;
  private readonly clubsSidebarComponent: ClubsSidebarComponent;
  private readonly CARDS_PER_PAGE = 4;
  private readonly listCardLocator: Locator;

  private readonly clubList: ListClubCardComponent;

  constructor(page: Page) {
    super(page);
    this.listCardLocator = this.page.locator('.club-sider');
    this.clubList = new ListClubCardComponent(this.listCardLocator);
    this.newsList = page.locator('.global-padding.news-content');
    this.newsListComponent = new NewsCardListComponent(this.newsList);
    this.clubsSidebar = page.locator('.club-sider');
    this.clubsSidebarComponent = new ClubsSidebarComponent(this.clubsSidebar);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/news');
  }

  getNewsList(): NewsCardListComponent {
    return this.newsListComponent;
  }

  async getClubList(): Promise<ClubCardComponent[]> {
    return await this.clubList.getClubs();
  }
  async getFirstClubCard(): Promise<ClubCardComponent> {
    return await this.clubList.getClubCardByIndex(0);
  }


  getClubsSidebar(): ClubsSidebarComponent {
    return this.clubsSidebarComponent;
  }

  getPagination(): PaginationComponent {
    return this.pagination;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.newsList.waitFor({ state: 'visible' });
  }

  async getNewsTitles(): Promise<string[]> {
    // const titles = await this.newsListComponent.getAllCards().then(cards => Promise.all(cards.map(card => card.getTitle())));
    const cards = await this.newsListComponent.getAllCards();
    const titles: string[] = [];
    for (const card of cards) {
      titles.push(await card.getTitle());
    }
    
    return titles;
  }

  async getCardByGeneralIndex(generalIndex: number): Promise<NewsCardComponent> {
    const targetPage = Math.ceil(generalIndex / this.CARDS_PER_PAGE);
    const localIndex = (generalIndex - 1) % this.CARDS_PER_PAGE;

    const currentPage = await this.pagination.getActivePageNumber();

    if (currentPage !== targetPage) {
      await this.pagination.goToPage(targetPage);
      await this.waitForPageLoad();
    }

    return this.newsListComponent.getNewsByIndex(localIndex);
  }
}
