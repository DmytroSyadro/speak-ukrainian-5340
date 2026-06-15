import { test, expect } from '@playwright/test';
import { ChallengePage } from '../pages/challenge-page';
import { ChallengeTaskPage } from '../pages/challenge-task-page';

test.use({ viewport: { width: 1920, height: 1080 } });

test('Navigate from Challenge page to a specific Task and interact with video @Lazur @E2E', async ({
  page,
}) => {
  test.setTimeout(60000);

  const challengePage = new ChallengePage(page);
  await challengePage.goto(5);
  await challengePage.waitForPageLoad();

  const carousel = challengePage.getTasksCarouselComponent();
  const targetCardName = 'День 12. Мовна практика';

  const targetCard = await carousel.scrollToTaskCardByName(targetCardName);
  expect(targetCard, `Card "${targetCardName}" should exist in the DOM`).toBeDefined();

  await expect(
    targetCard!.getRootLocator(),
    'Target card should be visible after scrolling'
  ).toBeVisible();

  await targetCard!.clickTask();

  await expect(page).toHaveURL(/.*\/challenges\/task\/\d+/);

  const taskPage = new ChallengeTaskPage(page);
  const actualHeader = await taskPage.getTaskHeader();
  expect(actualHeader).toBe(targetCardName);

  await taskPage.playVideo(0);

  const isPlaying = await taskPage.isVideoPlaying(0);
  expect(isPlaying, 'Video should start playing and enter playing-mode').toBeTruthy();
});
