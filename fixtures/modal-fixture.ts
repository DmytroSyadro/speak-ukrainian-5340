import { test as pageTest, expect as baseExpect } from './page-fixture';
import {
  ClubModal,
  MapModal,
  SignInModal,
  AddClubModal,
  AddLocationModal,
  CommentModal,
  SignUpModal,
} from '@/modals';

type ModalFixture = {
  mapModal: MapModal;
  clubModal: ClubModal;
  signInModal: SignInModal;
  addClubModal: AddClubModal;
  addLocationModal: AddLocationModal;
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
  addClubModal: async ({ page }, use): Promise<void> => {
    await use(new AddClubModal(page));
  },
  addLocationModal: async ({ page }, use): Promise<void> => {
    await use(new AddLocationModal(page));
  },
  signUpModal: async ({ page }, use): Promise<void> => {
    await use(new SignUpModal(page));
  },
  commentModal: async ({ page }, use): Promise<void> => {
    await use(new CommentModal(page));
  },
});
export { baseExpect as expect };
