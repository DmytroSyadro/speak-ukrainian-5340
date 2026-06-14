import type { Page } from '@playwright/test';

import { BasePage } from './base-page'; 
import { NewsCardListComponent } from './components/news-card-list-component';
import { PaginationComponent } from './components/pagination-component';
import { ClubsSidebarComponent } from './components/clubs-sidebar-component';
import { NewsCardComponent } from './components/news-card-component';

export class NewsPage extends BasePage {
    private readonly newsListComponent: NewsCardListComponent;
    private readonly paginationComponent: PaginationComponent;
    private readonly clubsSidebarComponent: ClubsSidebarComponent;

    constructor(page: Page) {
        super(page);
        this.newsListComponent = new NewsCardListComponent(
            this.page.locator('.global-padding.news-content')
        );
        this.paginationComponent = new PaginationComponent(
            this.page.locator('ul.ant-pagination')
        );
        this.clubsSidebarComponent = new ClubsSidebarComponent(
            this.page.locator('.club-sider')
        );
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
        const CARDS_PER_PAGE = 4;
        const targetPage = Math.ceil(generalIndex / CARDS_PER_PAGE);
        const localIndex = (generalIndex - 1) % CARDS_PER_PAGE;

        const currentPage = await this.paginationComponent.getActivePageNumber();
        
        if (currentPage !== targetPage) {
            await this.paginationComponent.goToPage(targetPage);
            await this.page.waitForLoadState('networkidle'); 
        }

        return this.newsListComponent.getNewsByIndex(localIndex);
    }
}