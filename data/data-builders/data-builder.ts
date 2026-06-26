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
}
