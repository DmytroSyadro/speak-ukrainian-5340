import { test as pageTest, expect as baseExpect } from './page-fixture';
import { ClubModal, MapModal } from '@/modals';

type ModalFixture = {
  mapModal: MapModal;
  clubModal: ClubModal;
};
export const test = pageTest.extend<ModalFixture>({
  mapModal: async ({ page }, use): Promise<void> => {
    const mapModal = new MapModal(page);
    await use(mapModal);
  },
  clubModal: async ({ page }, use): Promise<void> => {
    const clubModal = new ClubModal(page);
    await use(clubModal);
  },
});
export { baseExpect as expect };
