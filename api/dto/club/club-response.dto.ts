import { ClubLocationDto, ClubWorkTimeDto } from '@/api/dto';

export interface ClubResponseDto {
  id: number;
  name: string;
  description: string;
  ageFrom: number;
  ageTo: number;
  urlWeb?: string;
  urlLogo?: string;
  urlBackground?: string;
  urlGallery?: string[];
  workTimes?: ClubWorkTimeDto[];
  locations: ClubLocationDto[];
  isOnline?: boolean;
  isApproved?: boolean;
  contacts?: string;
  rating?: number;
  feedbackCount?: number;
}
