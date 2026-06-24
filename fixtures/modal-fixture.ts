import { test as pageTest, expect as baseExpect } from './page-fixture';
import { ClubModal, MapModal, SignInModal } from '@/modals';

type ModalFixture = {
  mapModal: MapModal;
  clubModal: ClubModal;
  signInModal: SignInModal;
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
  signInModal: async ({ page }, use): Promise<void> => {
    const signInModal = new SignInModal(page);
    await use(signInModal);
  },
});
export { baseExpect as expect };
