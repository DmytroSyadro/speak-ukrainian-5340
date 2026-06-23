import { DataBuilder } from '@/data/data-builder';
import { Challenges } from '@/data/challenges';
import { test, expect } from '@/fixtures/modal-fixture';
import { Page } from '@playwright/test';
import type { PaymentFormComponent } from '@/components/payment/payment-form-component';
import { PaymentPage } from '@/pages/payment-page';
import * as allure from 'allure-js-commons';

test.describe('Payment Challenge', (): void => {
  const invalidData = DataBuilder.invalidFormPayment();

  const challengeCases: Challenges[] = [
    Challenges.TEACH_URK,
    Challenges.TEACH_URK_CHALLENGE,
    Challenges.UKR_CLUB,
    Challenges.LANG_MARATHON,
    Challenges.UNITED,
  ];

  for (const challenge of challengeCases) {
    test(`Verify that the "${challenge}" challenge page contains "Допомогти проєкту" button with redirecting to the payment modal`, async ({
      challengePage,
      homePage,
    }): Promise<void> => {
      await allure.step(
        `Open home page and navigate to "${challenge}" challenge`,
        async (): Promise<void> => {
          await homePage.goto();
          await challengePage.waitForPageLoad();
          await challengePage.selectChallenge(challenge);
          await challengePage.waitForPageLoad();
        }
      );

      let newTab: Page;
      await allure.step(
        'Click "Допомогти проєкту" button and switch to payment tab',
        async (): Promise<void> => {
          await challengePage.clickHelpButton();
          newTab = await challengePage.switchToNewTab();
        }
      );

      const paymentPage = new PaymentPage(newTab!);
      let paymentForm: PaymentFormComponent;

      await allure.step('Verify redirect to WayForPay payment page', async (): Promise<void> => {
        await paymentPage.waitForPageLoad();
        await expect(newTab).toHaveURL('https://secure.wayforpay.com/payment/s0f2891d77061');
      });

      await allure.step('Fill payment form with invalid data', async (): Promise<void> => {
        await paymentPage.fillInPaymentForm(invalidData);
        paymentForm = await paymentPage.getPaymentForm();
        await paymentForm.clickPayButton();
      });

      await allure.step(
        'Verify validation error messages are displayed',
        async (): Promise<void> => {
          expect(await paymentForm.isCardErrorMessageVisible()).toBeTruthy();
          expect(await paymentForm.isEmailErrorMessageVisible()).toBeTruthy();
          expect(await paymentForm.isExpirationErrorMessageVisible()).toBeTruthy();
          expect(await paymentForm.isSumErrorMessageVisible()).toBeTruthy();
          expect(await paymentForm.isNumberErrorMessageVisible()).toBeTruthy();
        }
      );

      await allure.step(
        'Return to challenge page and close payment tab',
        async (): Promise<void> => {
          await challengePage.switchToTabByIndex(0);
          await challengePage.waitForPageLoad();
          await paymentPage.closeCurrentTab();
        }
      );
    });
  }
});
