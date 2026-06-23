import { test, expect } from '@/fixtures';

test.describe('Challenge Task Page content pressnce', () => {
  test('Verify task details and embedded videos for task 73', async ({ challengeTaskPage }) => {
    const task = 73;

    await test.step('Navigate to task page 73', async () => {
      await challengeTaskPage.goto(task);
      await challengeTaskPage.waitForNetworkIdle();
    });

    await test.step('Verify the task header title', async () => {
      const headerTitle = await challengeTaskPage.getTaskHeader();
      expect(headerTitle).toBe('День 12. Мовна практика');
    });

    await test.step('Verify the main content text', async () => {
      const mainContent = await challengeTaskPage.getMainContentText();
      expect(mainContent).toBe(`Проєкт "Єдині": 28 днів підтримки в переході на українську`);
    });

    await test.step('Verify the presence and URLs of embedded YouTube videos', async () => {
      const iframeURLs = await challengeTaskPage.getIframeUrls();
      expect(iframeURLs).toHaveLength(2);

      for (const url of iframeURLs) {
        expect(url).toMatch(/youtube\.com\/embed\//);
      }
    });
  });
});
