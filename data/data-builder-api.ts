import { ClubRequestDto } from '@/api/dto';
import { ClubCategory } from '@/data/club-category';
import { CreateStationDto, UpdateStationDto } from '@/api/dto';

export class DataBuilderApi {
  static invalidClubIds() {
    return [
      { id: -1, description: 'negative id' },
      { id: 0, description: 'zero id' },
      { id: 99999999, description: 'non-existent id' },
    ];
  }

  static validClubPayload(overrides?: Partial<ClubRequestDto>): ClubRequestDto {
    const draftJsDescription = JSON.stringify({
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

    return {
      name: 'Test Club',
      description: draftJsDescription,
      centerId: 1,
      categoriesName: [ClubCategory.DEVELOPMENT_CENTER, ClubCategory.PROGRAMMING],
      locations: [],
      ageFrom: 16,
      ageTo: 17,
      isOnline: true,
      contacts: '12331',
      isApproved: true,
      ...overrides,
    };
  }

  static validStationPayload(overrides?: Partial<CreateStationDto>): CreateStationDto {
    return {
      name: 'Test Station',
      cityName: 'Київ',
      districtName: 'Деснянський',
      ...overrides,
    };
  }

  static updateStationPayload(overrides?: Partial<UpdateStationDto>): UpdateStationDto {
    return {
      name: 'Updated Test Station',
      cityName: 'Одеса',
      districtName: 'Малиновський',
      ...overrides,
    };
  }

  static invalidStationPayloads() {
    return [
      {
        payload: { name: '', cityName: 'Київ', districtName: 'Деснянський' },
        description: 'empty name',
      },
      {
        payload: { name: 'Test', cityName: '', districtName: 'Деснянський' },
        description: 'empty cityName',
      },
      {
        payload: { name: 'Test', cityName: 'Київ', districtName: '' },
        description: 'empty districtName',
      },
    ];
  }
}
