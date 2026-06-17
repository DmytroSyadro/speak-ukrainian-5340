import { expect, test } from '@playwright/test';
import process from 'process';

const COMMENT_TEXT = `Test Description ${Date.now()}`;

async function openAuthMenu(page: Parameters<typeof test>[0]['page'], itemRegex: RegExp) {
  await page.locator('div.ant-dropdown-trigger.user-profile').click();

  const menuItem = page
    .locator('ul.ant-dropdown-menu[role="menu"]')
    .getByRole('menuitem')
    .filter({ hasText: itemRegex })
    .first();

  await expect(menuItem).toBeVisible({ timeout: 5000 });
  await menuItem.click();
}

test('E2E — Login → Clubs → Club Page → Post a Comment @E2E', async ({ page }) => {
  test.setTimeout(90_000);

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    test.skip(true, 'Set TEST_EMAIL and TEST_PASSWORD in .env');
  }

  // 1) Sign In
  await page.goto('/');
  await openAuthMenu(page, /увійти/i);
  await expect(page.locator('div.ant-modal.modal-login[role="dialog"]')).toBeVisible({
    timeout: 7000,
  });

  await page.locator('#basic_email').fill(email as string);
  await page.locator('#basic_password').fill(password as string);
  await page.getByRole('button', { name: /увійти/i }).click();
  await expect(page.locator('div.ant-modal.modal-login[role="dialog"]')).toBeHidden({
    timeout: 7000,
  });

  // 2) Clubs page
  await page.goto('/clubs');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/clubs/);

  // 3) Open first club
  const firstClubLink = page.locator('main.club-list-content a[href*="/club/"]').first();
  await expect(firstClubLink).toBeVisible({ timeout: 15000 });
  await firstClubLink.click();
  await expect(page).toHaveURL(/\/club\/\d+/);

  // 4) Wait for club page content
  await expect(page.locator('.club-page')).toBeVisible({ timeout: 15000 });

  // 5) Scroll to comments section
  const commentsSection = page.locator('main.page-comments');
  await commentsSection.scrollIntoViewIfNeeded();
  await expect(commentsSection).toBeVisible();

  // 6) Open comment modal and check tabs
  await page.locator('button.comment-button').click();
  const commentModal = page.locator('div.ant-modal.comment-modal[role="dialog"]');
  await expect(commentModal).toBeVisible({ timeout: 7000 });
  await expect(commentModal.getByRole('tab', { name: /коментар/i })).toBeVisible();
  await expect(commentModal.getByRole('tab', { name: /скарга/i })).toBeVisible();

  // 7) Hover 5th star
  const stars = commentModal.locator('ul.ant-rate li.ant-rate-star');
  await stars.nth(4).hover();
  await expect(commentModal.locator('li.ant-rate-star-active, li.ant-rate-star-full')).toHaveCount(5);

  // 8) Focus textarea
  const textarea = commentModal.locator('textarea').first();
  await textarea.click();
  await expect(textarea).toBeFocused();

  // 9) Type comment
  await textarea.fill(COMMENT_TEXT);
  await expect(textarea).toHaveValue(COMMENT_TEXT);

  // 10) Submit
  const authorName = await commentModal.locator('.comment-fields .comment-input-box').first().inputValue();
  await commentModal.locator('button.do-comment-button').click();

  // 11-13) Verify list updated with text + author
  const createdComment = commentsSection
    .locator('.ant-comment.root-comment')
    .filter({ hasText: COMMENT_TEXT })
    .first();

  await expect(createdComment).toBeVisible({ timeout: 15000 });
  await expect(createdComment.locator('.ant-comment-content-detail p:not(.answer-p)').first()).toHaveText(
    COMMENT_TEXT
  );
  await expect(createdComment.locator('.name').first()).toContainText(authorName.trim());

  // 14) No error
  await expect(page.locator('.ant-form-item-explain-error')).toHaveCount(0);
});
