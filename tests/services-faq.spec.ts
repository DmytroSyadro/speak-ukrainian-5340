import { test, expect } from '@playwright/test';
import { ServicesPage } from '@/pages/services-page';
import { FaqComponent } from '@/components/faq/faq-component';
import { FaqItemComponent } from '@/components/faq/faq-item-component';

test.describe('TC-030 Сhecking the functionality of the "Services in Ukrainian" page', () => {
  let servicesPage: ServicesPage;
  let faqComponent: FaqComponent;
  let firstItem: FaqItemComponent;
  let secondItem: FaqItemComponent;
  let thirdItem: FaqItemComponent;
  let lastItem: FaqItemComponent;

  test.beforeEach(async ({ page }) => {
    servicesPage = new ServicesPage(page);
    await page.goto('/service');
    await page.locator('.faq').waitFor({ state: 'visible' });

    faqComponent = servicesPage.getFaqComponent();
    firstItem = await faqComponent.getItemByIndex(0);
    secondItem = await faqComponent.getItemByIndex(1);
    thirdItem = await faqComponent.getItemByIndex(2);
    lastItem = await faqComponent.getItemByIndex((await faqComponent.getItemsCount()) - 1);
  });

  test('Step 1 – Service page loads and shows FAQ items', async () => {
    expect(await servicesPage.isHeroBannerVisible()).toBe(true);
    expect(await servicesPage.isFaqSectionVisible()).toBe(true);

    expect(await faqComponent.getItemsCount()).toBe(3);

    expect(await firstItem.isExpanded()).toBe(true);
    expect(await secondItem.isExpanded()).toBe(false);
    expect(await thirdItem.isExpanded()).toBe(false);
  });

  test('Step 2 – First FAQ item collapses on click and expands back', async () => {
    expect(await firstItem.getTitle()).toContain(
      'Як діяти, якщо вам відмовляють в інформації чи послугах українською мовою'
    );
    expect(await firstItem.isArrowVisible()).toBe(true);
    expect(await firstItem.isExpanded()).toBe(true);

    await firstItem.collapse();
    expect(await firstItem.isExpanded()).toBe(false);

    await firstItem.expand();
    expect(await firstItem.isExpanded()).toBe(true);
  });

  test('Step 3 – Second FAQ item expands and reveals its content', async () => {
    expect(await secondItem.getTitle()).toContain('Куди можна подавати скаргу');
    expect(await secondItem.isExpanded()).toBe(false);

    await secondItem.expand();

    expect(await secondItem.isExpanded()).toBe(true);
    expect((await secondItem.getContent()).trim().length).toBeGreaterThan(0);
  });

  test('Step 4 – Third FAQ item expands and reveals its content', async () => {
    expect(await thirdItem.getTitle()).toContain('Що має містити скарга');
    expect(await thirdItem.isExpanded()).toBe(false);

    await thirdItem.expand();

    expect(await thirdItem.isExpanded()).toBe(true);
    expect((await thirdItem.getContent()).trim().length).toBeGreaterThan(0);
  });

  test('Step 5 – Verify accordion behaviour when multiple items are clicked', async () => {
    await firstItem.expand();
    expect(await firstItem.isExpanded()).toBe(true);
    expect(await secondItem.isExpanded()).toBe(false);

    await secondItem.expand();
    expect(await firstItem.isExpanded()).toBe(true);
    expect(await secondItem.isExpanded()).toBe(true);
  });

  test('Step 6 – Last FAQ item collapses on second click and arrow returns to original state', async () => {
    await lastItem.expand();
    expect(await lastItem.isExpanded()).toBe(true);
    expect(await lastItem.isArrowVisible()).toBe(true);

    await lastItem.collapse();

    expect(await lastItem.isExpanded()).toBe(false);
    expect(await lastItem.isArrowVisible()).toBe(true);
  });

  test('Full TC-030 flow – expand all FAQ items then collapse the last one', async () => {
    const allItems = [firstItem, secondItem, thirdItem];
    const expectedTitles = [
      'Як діяти, якщо вам відмовляють в інформації чи послугах українською мовою',
      'Куди можна подавати скаргу',
      'Що має містити скарга',
    ];

    expect(await faqComponent.getItemsCount()).toBe(3);
    expect(await firstItem.isExpanded()).toBe(true);
    expect(await secondItem.isExpanded()).toBe(false);
    expect(await thirdItem.isExpanded()).toBe(false);

    for (let i = 0; i < allItems.length; i++) {
      expect(await allItems[i].getTitle()).toContain(expectedTitles[i]);
      await allItems[i].expand();
      expect(await allItems[i].isExpanded()).toBe(true);
      expect((await allItems[i].getContent()).trim().length).toBeGreaterThan(0);
    }

    await lastItem.collapse();
    expect(await lastItem.isExpanded()).toBe(false);
    expect(await lastItem.isArrowVisible()).toBe(true);

    expect(await servicesPage.isSupportProjectButtonVisible()).toBe(true);
  });
});
