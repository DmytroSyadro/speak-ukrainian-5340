import { CategoryRequestDto } from '@/api/dto';
import { DataHelpers } from './helpers';

export class CategoryBuilder {
  private static basePayload(): CategoryRequestDto {
    return {
      id: 0,
      sortby: 1,
      name: `Auto Test Category ${DataHelpers.getUniqueSuffix()}`,
      description: 'Category created by Playwright API test',
      urlLogo: 'https://example.com/logo.png',
      backgroundColor: '#FFFFFF',
      tagBackgroundColor: '#000000',
      tagTextColor: '#FF0000',
    };
  }

  static validPayload(overrides?: Partial<CategoryRequestDto>): CategoryRequestDto {
    return { ...this.basePayload(), ...overrides };
  }

  static invalidNamePayload(overrides?: Partial<CategoryRequestDto>): CategoryRequestDto {
    return { ...this.basePayload(), name: '', ...overrides };
  }

  static validUpdatePayload(overrides?: Partial<CategoryRequestDto>): CategoryRequestDto {
    return {
      ...this.basePayload(),
      name: `Updated Category ${DataHelpers.getUniqueSuffix()}`,
      description: 'This description was updated via PUT request',
      sortby: 99,
      ...overrides,
    };
  }
}
