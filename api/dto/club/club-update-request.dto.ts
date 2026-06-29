import { ClubCategory } from '@/data';

export interface ClubUpdateRequestDto {
  id?: number;
  name: string;
  description: string;
  ageFrom: number;
  ageTo: number;
  isOnline: boolean;
  isApproved?: boolean;
  contacts: { contactType: { id: number; name: string; urlLogo: string }; contactData: string }[];
  categories: { id: number; name: ClubCategory }[];
  locations: unknown[];
  urlWeb?: string;
  urlLogo?: string;
  urlBackground?: string;
}
