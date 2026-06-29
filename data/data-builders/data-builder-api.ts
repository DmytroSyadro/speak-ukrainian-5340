import { ClubRequestDto, CityRequestDto } from '@/api/dto';
import { ClubCategory } from '@/data/club-category';
import { ClubUpdateRequestDto } from '@/api/dto/club/club-update-request.dto';
import {
  ClubRegistrationRequestDto,
  ClubRegistrationUserRequestDto,
} from '@/api/dto/club-registration';
import {
  CertificateByTemplateTransferDto,
  CertificateTemplatePreviewDto,
} from '@/api/dto/certificate-by-template';
import { TaskRequestDto, TaskUpdateRequestDto } from '@/api/dto/challenge-task';

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

  private static updateBasePayload(
    overrides?: Partial<ClubUpdateRequestDto>
  ): ClubUpdateRequestDto {
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

  static validClubRegistrationUserPayload(
    clubId: number,
    userId: number
  ): ClubRegistrationUserRequestDto {
    return {
      userId: userId,
      clubId: clubId,
      comment: 'Test comment for user registration',
    };
  }

  static validClubRegistrationPayload(
    clubId: number,
    childIds: number[]
  ): ClubRegistrationRequestDto {
    return {
      childIds: childIds,
      clubId: clubId,
      comment: 'Test comment for children registration',
    };
  }

  static validCertificateTransferPayload(): CertificateByTemplateTransferDto {
    return {
      fieldsList: ['name', 'date'],
      fieldPropertiesList: ['string', 'date'],
      templateName: 'StandardTemplate',
      values: 'value1, value2',
      columnHeadersList: ['Student Name', 'Completion Date'],
      excelContent: [['John Doe', '2026-06-28']],
      excelColumnsOrder: ['0', '1'],
      googleFormResults: [
        {
          userEmail: 'student@example.com',
          fullName: 'John Doe',
          totalScore: 100,
        },
      ],
    };
  }

  static validCertificatePreviewPayload(): CertificateTemplatePreviewDto {
    return {
      id: 1, // Dummy ID
      name: 'Test Template',
      filePath: '/path/to/template.pdf',
      certificateType: {
        id: 1,
        codeNumber: 101,
        name: 'Completion',
      },
      courseDescription: 'Intro to testing',
      projectDescription: 'Final Project',
      picturePath: '/path/to/pic.png',
      properties: '{"color": "blue"}',
      used: true,
    };
  }

  static validTaskPayload(): TaskRequestDto {
    return {
      name: `Test Task ${Date.now()}`,
      headerText: 'This is a sufficiently long header text to pass validation.',
      description: 'This is a sufficiently long description text to pass validation.',
      picture: '/upload/test-picture.png',
      startDate: '2026-06-28',
      isActive: true,
    };
  }

  static validTaskUpdatePayload(challengeId: number): TaskUpdateRequestDto {
    return {
      ...this.validTaskPayload(),
      name: `Updated Task ${Date.now()}`,
      challengeId: challengeId,
    };
  }
  static validDistrictIds() {
    return {
      existingId: 1,
    };
  }

  static validDistrictName() {
    return {
      existingName: 'Шевченківський',
    };
  }

  static invalidDistrictIds() {
    return [
      { id: -1, description: 'negative ID' },
      { id: 0, description: 'zero ID' },
      { id: 1000, description: 'non-existing ID' },
    ];
  }

  static validCityPayload(overrides?: Partial<CityRequestDto>): CityRequestDto {
    return {
      name: `Test City ${Date.now()}`,
      latitude: 50.4501,
      longitude: 30.5234,
      ...overrides,
    };
  }
}
