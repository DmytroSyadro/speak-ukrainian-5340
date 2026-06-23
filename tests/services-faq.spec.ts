import { expect, test } from '@/fixtures';
import * as allure from 'allure-js-commons';

import { FaqComponent } from '@/components/faq/faq-component';
import { FaqItemComponent } from '@/components/faq/faq-item-component';

test.describe('TC-030 Сhecking the functionality of the "Services in Ukrainian" page', () => {
  let faqComponent: FaqComponent;
  let firstItem: FaqItemComponent;
  let secondItem: FaqItemComponent;
  let thirdItem: FaqItemComponent;
  let lastItem: FaqItemComponent;

  test.beforeEach(async ({ page, servicesPage }) => {
    await page.goto('/service');
    await page.locator('.faq').waitFor({ state: 'visible' });

    faqComponent = servicesPage.getFaqComponent();
    firstItem = await faqComponent.getItemByIndex(0);
    secondItem = await faqComponent.getItemByIndex(1);
    thirdItem = await faqComponent.getItemByIndex(2);
    lastItem = await faqComponent.getItemByIndex((await faqComponent.getItemsCount()) - 1);
  });

  test('Step 1 – Service page loads correctly and FAQ items are visible and collapsed', async ({
    servicesPage,
  }) => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Verify the page and FAQ section are visible', async () => {
      expect(await servicesPage.isHeroBannerVisible()).toBe(true);
      expect(await servicesPage.isFaqSectionVisible()).toBe(true);
    });

    await allure.step('Verify three accordion items are visible and collapsed', async () => {
      expect(await faqComponent.getItemsCount()).toBe(3);
      expect(await firstItem.isExpanded()).toBe(false);
      expect(await secondItem.isExpanded()).toBe(false);
      expect(await thirdItem.isExpanded()).toBe(false);
    });
  });

  test('Step 2 – First FAQ item expands and reveals the answer text and arrow rotates', async () => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Verify the first item title and initial state', async () => {
      expect(await firstItem.getTitle()).toContain(
        'Як діяти, якщо вам відмовляють в інформації чи послугах українською мовою'
      );
      expect(await firstItem.isArrowVisible()).toBe(true);
      expect(await firstItem.isExpanded()).toBe(false);
    });

    await allure.step('Click the first item and verify it expands', async () => {
      await firstItem.expand();
      expect(await firstItem.isExpanded()).toBe(true);
      expect((await firstItem.getContent()).trim().length).toBeGreaterThan(0);
      expect(await firstItem.isArrowVisible()).toBe(true);
    });
  });

  test('Step 3 – Second FAQ item expands and reveals its content', async () => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Verify the second item title and initial state', async () => {
      expect(await secondItem.getTitle()).toContain('Куди можна подавати скаргу');
      expect(await secondItem.isExpanded()).toBe(false);
    });

    await allure.step('Click the second item and verify it expands', async () => {
      await secondItem.expand();
      expect(await secondItem.isExpanded()).toBe(true);
      expect((await secondItem.getContent()).trim().length).toBeGreaterThan(0);
    });
  });

  test('Step 4 – Third FAQ item expands and reveals its content', async () => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Verify the third item title and initial state', async () => {
      expect(await thirdItem.getTitle()).toContain('Що має містити скарга');
      expect(await thirdItem.isExpanded()).toBe(false);
    });

    await allure.step('Click the third item and verify it expands', async () => {
      await thirdItem.expand();
      expect(await thirdItem.isExpanded()).toBe(true);
      expect((await thirdItem.getContent()).trim().length).toBeGreaterThan(0);
    });
  });

  test('Step 5 – Verify accordion behaviour when multiple items are clicked', async () => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Expand the first item and verify only it is open', async () => {
      await firstItem.expand();
      expect(await firstItem.isExpanded()).toBe(true);
      expect(await secondItem.isExpanded()).toBe(false);
    });

    await allure.step('Expand the second item and verify both are open', async () => {
      await secondItem.expand();
      expect(await firstItem.isExpanded()).toBe(true);
      expect(await secondItem.isExpanded()).toBe(true);
    });

    await allure.step('Expand the third item and verify all three are open', async () => {
      await thirdItem.expand();
      expect(await firstItem.isExpanded()).toBe(true);
      expect(await secondItem.isExpanded()).toBe(true);
      expect(await thirdItem.isExpanded()).toBe(true);
    });
  });

  test('Step 6 – Last FAQ item collapses on second click and arrow returns to original state', async () => {
    await allure.epic('Speak Ukrainian');
    await allure.feature('Services page');
    await allure.story('FAQ accordion');
    await allure.tags('UI', 'Services', 'FAQ');

    await allure.step('Expand the last item and verify it is open', async () => {
      await lastItem.expand();
      expect(await lastItem.isExpanded()).toBe(true);
      expect(await lastItem.isArrowVisible()).toBe(true);
    });

    await allure.step('Collapse the last item and verify it is closed', async () => {
      await lastItem.collapse();
      expect(await lastItem.isExpanded()).toBe(false);
      expect(await lastItem.isArrowVisible()).toBe(true);
    });
  });
});
