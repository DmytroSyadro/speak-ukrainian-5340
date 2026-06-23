import { expect, test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import env from '../../config/env';
import { TEST_TIMEOUTS } from '../../config/test-timeouts';
import { HomePage } from '../../pages/home-page';
import { ClubPage } from '../../pages/club-page';
import { ClubDetailsPage } from '../../pages/club-details-page';
import { SignInModal } from '../../modals/authorization/sign-in-modal';
import { CommentModal } from '../../modals/comment-modal';
import { CommentComponent } from '../../components/comment/comment-component';

const COMMENT_TEXT = `Test Comment ${new Date().toLocaleTimeString('uk-UA')}`;

test('E2E — Login → Clubs → Club Page → Post a Comment @E2E', async ({ page }) => {
  test.setTimeout(TEST_TIMEOUTS.longE2E);

  await allure.epic('Speak Ukrainian');
  await allure.feature('Club page');
  await allure.story('As a logged-in user, I want to navigate to a club page and post a comment.');
  await allure.severity('critical');
  await allure.tags('E2E', 'auth', 'comments');
  await allure.displayName('E2E — Login → Clubs → Club Page → Post a Comment');
  await allure.description(
    'Critical E2E flow: sign in, open the first club from the clubs list, post a comment, and verify it appears without validation errors.'
  );

  const email = env.TEST_EMAIL;
  const password = env.TEST_PASSWORD;

  const homePage = new HomePage(page);
  const clubPage = new ClubPage(page);
  const clubDetailsPage = new ClubDetailsPage(page);
  const signInModal = new SignInModal(page);
  const commentModal = new CommentModal(page);

  await allure.step('Step 1: Sign in via SignInModal', async () => {
    await homePage.navigateTo('/');
    await homePage.header.clickUserMenuItem(/увійти/i);

    const signInRoot = await signInModal.getRoot();
    await signInModal.fillCredentials(email, password);
    await signInModal.submit();
    await expect(signInRoot).toBeHidden();
  });

  await allure.step('Step 2: Navigate to the clubs page', async () => {
    await clubPage.navigate();
    await clubPage.waitForPageLoad();
    await expect(page).toHaveURL(/\/clubs/);
  });

  await allure.step('Step 3: Open the first club page', async () => {
    await clubPage.openFirstClubPage();
    await expect(page).toHaveURL(/\/club\/\d+/);
  });

  await allure.step('Step 4: Wait for club page to fully load', async () => {
    await expect.poll(async () => clubDetailsPage.isClubDetailsDisplayed()).toBeTruthy();
  });

  let commentsBefore = 0;

  await allure.step('Step 5: Scroll to the comments section', async () => {
    await clubDetailsPage.scrollToCommentsSection();
    await expect
      .poll(async () => clubDetailsPage.comments.isCommentsSectionDisplayed())
      .toBeTruthy();
    commentsBefore = await clubDetailsPage.comments.getCommentsCount();
  });

  await allure.step('Step 6: Open comment modal and verify tabs', async () => {
    await clubDetailsPage.clickLeaveComment();

    const commentModalRoot = await commentModal.getRoot();
    await expect(commentModalRoot).toBeVisible();
    expect(await commentModal.isCommentTabVisible()).toBeTruthy();
    expect(await commentModal.isComplaintTabVisible()).toBeTruthy();
  });

  await allure.step('Step 7: Hover over the 5th star', async () => {
    await commentModal.hoverRatingStar(5);
    await expect.poll(async () => commentModal.getHighlightedStarCount()).toBe(5);
    await commentModal.clickRatingStar(5);
  });

  await allure.step('Step 8: Focus the comment textarea', async () => {
    const commentModalRoot = await commentModal.getRoot();
    await commentModal.clickCommentTextarea();
    await expect(commentModalRoot.locator('textarea')).toBeFocused();
  });

  await allure.step('Step 9: Type the comment text', async () => {
    await commentModal.fillComment(COMMENT_TEXT);
    await expect.poll(async () => commentModal.getCommentText()).toBe(COMMENT_TEXT);
  });

  let authorName = '';

  await allure.step('Step 10: Submit the comment', async () => {
    authorName = await commentModal.getAuthorName();
    await commentModal.submit();
  });

  await allure.step('Steps 11–13: Verify the new comment in the list', async () => {
    await expect
      .poll(async () => clubDetailsPage.comments.getCommentsCount())
      .toBeGreaterThan(commentsBefore);

    const createdComment: CommentComponent =
      clubDetailsPage.comments.getCommentByText(COMMENT_TEXT);
    await expect.poll(async () => createdComment.getText()).toContain(COMMENT_TEXT);
    await expect.poll(async () => createdComment.getAuthorName()).toContain(authorName.trim());
  });

  await allure.step('Step 14: Verify no validation errors are shown', async () => {
    await expect.poll(async () => clubDetailsPage.getFormErrorCount()).toBe(0);
  });
});
