import { test, expect } from '@playwright/test';
import { ChallengePage } from '../pages/challenge-page';
import { ChallengeTaskPage } from '../pages/challenge-task-page';

test.use({ viewport: { width: 1920, height: 1080 } });

test('Navigate from Challenge page to a specific Task and interact with video @Lazur @E2E', async ({
  page,
}) => {
  test.setTimeout(60000);

  const challengePage = new ChallengePage(page);

  // Step 1: Navigate to the challenge page
  await page.goto('/challenges/5', { waitUntil: 'domcontentloaded' });

  // Step 2: Locate the card in the carousel
  const carousel = challengePage.getTasksCarouselComponent();
  const targetCardName = 'День 12. Мовна практика';

  const targetCard = await carousel.getTaskCardByName(targetCardName);
  expect(targetCard, `Card "${targetCardName}" should exist in the DOM`).toBeDefined();

  let attempts = 0;
  while (!(await targetCard!.isVisible()) && attempts < 15) {
    await carousel.clickNextArrow();
    await page.waitForTimeout(400);
    attempts++;
  }

  expect(
    await targetCard!.isVisible(),
    'Target card should be visible after scrolling'
  ).toBeTruthy();

  // Step 3: Click on the card
  await targetCard!.clickTask();

  // Step 4: Verify page routing
  await expect(page).toHaveURL(/.*\/challenges\/task\/\d+/);

  // Step 5: Verify the task page loaded corresponds to the clicked card
  const taskPage = new ChallengeTaskPage(page);
  const actualHeader = await taskPage.getTaskHeader();
  expect(actualHeader).toBe(targetCardName);

  // Step 6 & 7: Click play and verify via DOM state
  await taskPage.playVideo(0);

  // Verify the video is actually playing by checking the player's internal state
  const isPlaying = await taskPage.isVideoPlaying(0);
  expect(isPlaying, 'Video should start playing and enter playing-mode').toBeTruthy();
});
