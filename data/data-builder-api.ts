import type { SignupRequestDto } from '@/api/models/user-registration.dto';

export class DataBuilderApi {
  static signupPayload(overrides: Partial<SignupRequestDto> = {}): SignupRequestDto {
    const uniqueSuffix = Date.now();

    return {
      email: `taqc.signup.${uniqueSuffix}@mailinator.com`,
      firstName: 'Тест',
      lastName: 'Тест',
      phone: '0307482105',
      password: 'Qwerty@1234',
      roleName: 'ROLE_MANAGER',
      ...overrides,
    };
  }
}
