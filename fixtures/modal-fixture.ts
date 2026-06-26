import { test as pageTest, expect as baseExpect } from './page-fixture';
import { ClubModal, CommentModal, MapModal, SignInModal, SignUpModal } from '@/modals';

type ModalFixture = {
  mapModal: MapModal;
  clubModal: ClubModal;
  signInModal: SignInModal;
  signUpModal: SignUpModal;
  commentModal: CommentModal;
};

export const test = pageTest.extend<ModalFixture>({
  mapModal: async ({ page }, use): Promise<void> => {
    await use(new MapModal(page));
  },
  clubModal: async ({ page }, use): Promise<void> => {
    await use(new ClubModal(page));
  },
  signInModal: async ({ page }, use): Promise<void> => {
    await use(new SignInModal(page));
  },
  signUpModal: async ({ page }, use): Promise<void> => {
    await use(new SignUpModal(page));
  },
  commentModal: async ({ page }, use): Promise<void> => {
    await use(new CommentModal(page));
  },
});
export { baseExpect as expect };
