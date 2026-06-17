import type { Page, Locator } from '@playwright/test';

import { BasePage } from './base-page';
import { NewsCardListComponent } from './components/news-card-list-component';
import { PaginationComponent } from './components/pagination-component';
import { ClubsSidebarComponent } from './components/clubs-sidebar-component';
import { NewsCardComponent } from './components/news-card-component';

export class NewsPage extends BasePage {
  private readonly newsList: Locator;
  private readonly newsListComponent: NewsCardListComponent;
  private readonly pagination: Locator;
  private readonly paginationComponent: PaginationComponent;
  private readonly clubsSidebar: Locator;
  private readonly clubsSidebarComponent: ClubsSidebarComponent;
  private readonly CARDS_PER_PAGE = 4;

  constructor(page: Page) {
    super(page);
    this.newsList = page.locator('.global-padding.news-content');
    this.newsListComponent = new NewsCardListComponent(this.newsList);
    this.pagination = page.locator('ul.ant-pagination');
    this.paginationComponent = new PaginationComponent(this.pagination);
    this.clubsSidebar = page.locator('.club-sider');
    this.clubsSidebarComponent = new ClubsSidebarComponent(this.clubsSidebar);
  }

  getNewsList(): NewsCardListComponent {
    return this.newsListComponent;
  }

  getPagination(): PaginationComponent {
    return this.paginationComponent;
  }

  getClubsSidebar(): ClubsSidebarComponent {
    return this.clubsSidebarComponent;
  }

  async getCardByGeneralIndex(generalIndex: number): Promise<NewsCardComponent> {
    const targetPage = Math.ceil(generalIndex / this.CARDS_PER_PAGE);
    const localIndex = (generalIndex - 1) % this.CARDS_PER_PAGE;

    const currentPage = await this.paginationComponent.getActivePageNumber();

    if (currentPage !== targetPage) {
      await this.paginationComponent.goToPage(targetPage);
      await this.page.waitForLoadState('networkidle');
    }

    return this.newsListComponent.getNewsByIndex(localIndex);
  }
}
