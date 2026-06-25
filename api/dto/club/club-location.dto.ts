export interface ClubLocationDto {
  id?: number;
  name: string;
  address: string;
  cityName: string;
  districtName?: string;
  stationName?: string;
  cityId: number;
  districtId?: number;
  stationId?: number;
  centerId?: number;
  clubId?: number;
  coordinates?: string;
  longitude?: number;
  latitude?: number;
  phone: string;
}
