import { expect, test } from '@playwright/test';

import { ChallengePage } from '../pages/challenge-page';

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe('Challenge page Tasks Carousel', () => {
  test('TC-045 Verify the Tasks Carousel navigation (Arrows and Dots)', async ({ page }) => {
    const challengePage = new ChallengePage(page);
    const activeCards = page.locator('.slick-active .primitive-card');
    const activeCardName = activeCards.first().locator('.name');

    await challengePage.goto(5);

    const carousel = challengePage.getTasksCarouselComponent();
    await carousel.waitForVisible();

    const allCards = await carousel.getAllTaskCards();
    expect(allCards.length).toBeGreaterThan(0);

    await expect(activeCards.first()).toBeVisible();
    const activeCount = await activeCards.count();
    expect(activeCount).toBe(4);

    const firstActiveCardName = await activeCardName.textContent();
    await carousel.clickNextArrow();
    await expect(activeCardName).not.toHaveText(firstActiveCardName!);

    const firstCardNameAfterNext = await activeCardName.textContent();
    expect(firstCardNameAfterNext).not.toBe(firstActiveCardName);

    await carousel.clickPrevArrow();
    await expect(activeCardName).toHaveText(firstActiveCardName!);

    const firstCardNameAfterPrev = await activeCardName.textContent();
    expect(firstCardNameAfterPrev).toBe(firstActiveCardName);

    await carousel.clickCarouselDot(2);
    await expect(activeCardName).not.toHaveText(firstActiveCardName!);

    await expect(activeCards.first()).toBeVisible();
    const activeCountAfterDot = await activeCards.count();
    expect(activeCountAfterDot).toBeGreaterThan(0);
  });
});
