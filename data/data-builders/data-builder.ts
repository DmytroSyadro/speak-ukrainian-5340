export interface AddClubData {
  clubName: string;
  category: string;
  ageFrom: number;
  ageTo: number;
  center: string;
  locationName: string;
  city: string;
  address: string;
  coordinates: string;
  phone: string;
  workDay: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  logoPath: string;
  description: string;
  stepContactsTitle: string;
  stepDescriptionTitle: string;
  successMessage: string;
  deleteOptionText: string;
  deleteSuccessMessage: string;
  profileUrlRegex: RegExp;
}

export class DataBuilder {
  static invalidFormPayment() {
    return {
      sum: '3000000',
      cardNumber: '1233132',
      expirationDate: '0312',
      cvc: '123',
      name: 'test',
      numberPhone: '3134144',
      email: 'test',
    };
  }

  static getAddClubData(): AddClubData {
    const uniqueId = Date.now().toString().slice(-6);
    return {
      clubName: `Тестовий Гурток ${uniqueId}`,
      category: 'Програмування, робототехніка, STEM',
      ageFrom: 6,
      ageTo: 12,
      center: 'Курси програмування IT-stat',
      locationName: 'Тестова Локація',
      city: 'Київ',
      address: 'вулиця Хрещатик, 1',
      coordinates: '50.4501, 30.5234',
      phone: '0961234567',
      workDay: 'Понеділок',
      startHour: '09',
      startMinute: '00',
      endHour: '18',
      endMinute: '00',
      logoPath: './test-data/test-logo.jpg',
      description:
        'Цей гурток створений виключно для цілей автоматизованого тестування. Він має достатню довжину для проходження валідації.',
      stepContactsTitle: 'Контакти',
      stepDescriptionTitle: 'Опис',
      successMessage: 'Гурток успішно створено',
      deleteOptionText: 'Видалити гурток',
      deleteSuccessMessage: 'Гурток успішно видалено',
      profileUrlRegex: /.*\/user\/\d+\/page/,
    };
  }
}
