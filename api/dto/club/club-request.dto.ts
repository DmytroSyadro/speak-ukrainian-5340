import { ClubWorkTimeDto, ClubLocationDto } from '@/api/dto';
import { ClubCategory } from '@/data';

export interface ClubRequestDto {
  name: string;
  description: string;
  centerId?: number;
  categoriesName: ClubCategory[];
  locations: ClubLocationDto[];
  ageFrom: number;
  ageTo: number;
  urlBackground?: string;
  urlLogo?: string;
  urlGallery?: { urlGallery: string }[];
  workTimes?: ClubWorkTimeDto[];
  isOnline: boolean;
  contacts: string;
  isApproved?: boolean;
  userId?: number;
  clubExternalId?: number;
  centerExternalId?: number;
}
