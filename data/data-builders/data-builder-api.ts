import { ClubRequestDto } from '@/api/dto';
import { ClubCategory } from '@/data/club-category';
import { ClubUpdateRequestDto } from '@/api/dto/club/club-update-request.dto';
import { SignupRequestDto } from '@/api/dto/user-registration.dto';

export class DataBuilderApi {
  private static buildDescription(): string {
    return JSON.stringify({
      blocks: [
        {
          key: 'test1',
          text: 'This is a test club description that is long enough to pass validation',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    });
  }

  private static baseClubPayload(): ClubRequestDto {
    return {
      name: `Test Club ${Date.now()}`,
      description: this.buildDescription(),
      categoriesName: [ClubCategory.DEVELOPMENT_CENTER, ClubCategory.PROGRAMMING],
      locations: [],
      ageFrom: 16,
      ageTo: 17,
      isOnline: true,
      contacts: '12331',
      isApproved: true,
    };
  }

  static updateBasePayload(overrides?: Partial<ClubUpdateRequestDto>): ClubUpdateRequestDto {
    return {
      name: `Updated Club ${Date.now()}`,
      description: this.buildDescription(),
      ageFrom: 2,
      ageTo: 11,
      isOnline: false,
      isApproved: true,
      contacts: [],
      categories: [{ id: 4, name: ClubCategory.PROGRAMMING }],
      locations: [],
      ...overrides,
    };
  }

  static invalidClubIds() {
    return [
      { id: -1, description: 'negative id' },
      { id: 0, description: 'zero id' },
      { id: 99999999, description: 'non-existent id' },
    ];
  }

  static validClubPayload(overrides?: Partial<ClubRequestDto>): ClubRequestDto {
    return { ...this.baseClubPayload(), ...overrides };
  }

  static validUpdateClubPayload(overrides?: { id: number }): ClubUpdateRequestDto {
    return { ...this.updateBasePayload(), ...overrides };
  }

  static invalidEarlyAgeClubPayload(overrides?: Partial<ClubRequestDto>): ClubRequestDto {
    return { ...this.baseClubPayload(), ageFrom: 18, ageTo: 16, ...overrides };
  }

  static invalidNameClubPayload(overrides?: Partial<ClubRequestDto>): ClubRequestDto {
    return { ...this.baseClubPayload(), name: '', ...overrides };
  }

  static invalidAgeUpdatePayload(overrides?: Partial<ClubUpdateRequestDto>): ClubUpdateRequestDto {
    return { ...this.updateBasePayload(), ageFrom: 18, ageTo: 16, ...overrides };
  }

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
