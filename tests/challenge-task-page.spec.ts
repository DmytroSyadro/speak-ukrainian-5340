import { test, expect } from '@playwright/test';
import { ChallengeTaskPage } from '@/pages/challenge-task-page';

test.describe('Challenge Task Page content pressnce', () => {
  test('Verify task details and embedded videos for task 73', async ({ page }) => {
    const task = 73;
    const taskPage = new ChallengeTaskPage(page);

    await test.step('Navigate to task page 73', async () => {
      await taskPage.goto(task);
      await taskPage.waitForNetworkIdle();
    });

    await test.step('Verify the task header title', async () => {
      const headerTitle = await taskPage.getTaskHeader();
      expect(headerTitle).toBe('День 12. Мовна практика');
    });

    await test.step('Verify the main content text', async () => {
      const mainContent = await taskPage.getMainContentText();
      expect(mainContent).toBe(`Проєкт "Єдині": 28 днів підтримки в переході на українську`);
    });

    await test.step('Verify the presence and URLs of embedded YouTube videos', async () => {
      const iframeURLs = await taskPage.getIframeUrls();
      expect(iframeURLs).toHaveLength(2);

      for (const url of iframeURLs) {
        expect(url).toMatch(/youtube\.com\/embed\//);
      }
    });
  });
});
