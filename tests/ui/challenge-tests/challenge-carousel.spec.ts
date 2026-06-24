import { test, expect } from '@/fixtures';
import * as allure from 'allure-js-commons';

test.describe('Challenge page Tasks Carousel', () => {
  test('TC-045 Verify the Tasks Carousel navigation (Arrows and Dots)', async ({
    challengePage,
  }) => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Challenge page');
    await allure.story(
      'As a user, I want to navigate through the Tasks Carousel using arrows and pagination dots.'
    );
    await allure.description(
      'Verifies that the Tasks Carousel on the Challenge page correctly navigates between slides using the next/prev arrows and pagination dots.'
    );

    const carousel = challengePage.getTasksCarouselComponent();

    await allure.step(
      'Step 1: Navigate to the Challenge page and scroll to the carousel',
      async () => {
        await challengePage.goto(5);
        await carousel.waitForVisible();

        const allCards = await carousel.getAllTaskCards();
        expect(allCards.length).toBeGreaterThan(0);
        await expect(carousel.getActiveCardsLocator().first()).toBeVisible();
        await expect(carousel.getActiveCardsLocator()).toHaveCount(4);
      }
    );

    const firstActiveCardNameText = (await carousel
      .getFirstActiveCardNameLocator()
      .textContent()) as string;

    await allure.step(
      'Step 2: Click the right arrow and verify the next set of cards is shown',
      async () => {
        await carousel.clickNextArrow();
        await expect(carousel.getFirstActiveCardNameLocator()).not.toHaveText(
          firstActiveCardNameText
        );
      }
    );

    await allure.step(
      'Step 3: Click the left arrow and verify the previous set of cards is restored',
      async () => {
        await carousel.clickPrevArrow();
        await expect(carousel.getFirstActiveCardNameLocator()).toHaveText(firstActiveCardNameText);
      }
    );

    await allure.step('Step 4: Click the 3rd pagination dot', async () => {
      await carousel.clickCarouselDot(2);
      await expect(carousel.getFirstActiveCardNameLocator()).not.toHaveText(
        firstActiveCardNameText
      );
    });

    await allure.step('Step 5: Verify the active cards correspond to the 3rd page', async () => {
      await expect(carousel.getActiveCardsLocator().first()).toBeVisible();
      await expect(carousel.getActiveCardsLocator()).toHaveCount(4);
    });
  });
});
