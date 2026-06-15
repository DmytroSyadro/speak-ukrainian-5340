import { test, expect } from '@playwright/test';
import { ChallengePage } from '../pages/challenge-page';
import { ChallengeTaskPage } from '../pages/challenge-task-page';

test.use({ viewport: { width: 1920, height: 1080 } });

test('Navigate from Challenge page to a specific Task and interact with video @Lazur @E2E', async ({
  page,
}) => {
  test.setTimeout(60000);

  // MOCKING YOUTUBE:
  await page.route('**/*youtu*/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; width: 100vw; height: 100vh; background: black; display: flex; justify-content: center; align-items: center; cursor: pointer;">
            <div class="ytp-large-play-button" style="width: 100px; height: 100px; background: red;"></div>
            <video id="mock-video"></video>
            
            <script>
              const video = document.getElementById('mock-video');
              const btn = document.querySelector('.ytp-large-play-button');
              
              let isPaused = true;
              let currentTime = 0;

              Object.defineProperties(video, {
                paused: { get: () => isPaused },
                ended: { get: () => false },
                readyState: { get: () => 4 },
                currentTime: { get: () => currentTime }
              });
              
              // Listen to ANY click on the entire iframe window
              window.addEventListener('click', () => {
                isPaused = false;
                btn.style.display = 'none'; // Hide button on play
                setInterval(() => currentTime += 0.5, 500);
              });
            </script>
          </body>
        </html>
      `,
    });
  });

  const challengePage = new ChallengePage(page);

  await challengePage.goto(5);

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

  // Click play
  await taskPage.playVideo(0);

  // Assert it plays (Our mock perfectly satisfies this HTML5 check)
  const isPlaying = await taskPage.isVideoPlaying(0);
  expect(isPlaying, 'Video should start playing').toBeTruthy();
});
