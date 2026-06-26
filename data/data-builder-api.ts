import { ClubRequestDto, NewsRequestDto } from '@/api/dto';
import { ClubCategory } from '@/data/club-category';

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

  static validNewsPayload(overrides?: Partial<NewsRequestDto>): NewsRequestDto {
    return {
      date: '2026-06-26',
      title: 'Валідна тестова новина від автотесту',
      description: 'This is a test news description that is long enough to pass validation',
      urlTitleLogo: '/upload/news/default-logo.png',
      isActive: true,
      ...overrides,
    };
  }
}
