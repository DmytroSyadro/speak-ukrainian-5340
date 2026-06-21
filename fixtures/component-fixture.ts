import { PaymentFormComponent } from '@/components/payment/payment-form-component';
import { MapComponent } from '@/components/map/map-component';
import { test as modalTest, expect as baseExpect } from './modal-fixture';

type ComponentFixtures = {
  paymentFormComponent: PaymentFormComponent;
  mapComponent: MapComponent;
};

export const test = modalTest.extend<ComponentFixtures>({
  paymentFormComponent: async ({ page }, use): Promise<void> => {
    const paymentFormComponent = new PaymentFormComponent(page.locator('div.payments'));
    await use(paymentFormComponent);
  },
  mapComponent: async ({ page }, use): Promise<void> => {
    const mapComponent = new MapComponent(page.locator("xpath=.//div[@class='gm-style']"));
    await use(mapComponent);
  },
});
export { baseExpect as expect };
