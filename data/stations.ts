import { CreateStationDto, UpdateStationDto } from '@/api/dto';

export const TEST_STATION: CreateStationDto = {
  name: 'Test Station',
  cityName: 'Київ',
  districtName: 'Деснянський',
};

export const UPDATED_STATION: UpdateStationDto = {
  name: 'Updated Test Station',
  cityName: 'Одеса',
  districtName: 'Малиновський',
};

export const FIRST_STATION = {
  id: 1,
  name: 'Академмістечко',
  cityName: 'Київ',
  districtName: 'Деснянський',
};

export const NON_EXISTENT_ID = 99999999;

export const INVALID_STATION_PAYLOADS = [
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

export const CITIES = {
  KYIV: 'Київ',
  KHARKIV: 'Харків',
  DNIPRO: 'Дніпро',
  ODESA: 'Одеса',
  NON_EXISTENT: 'NonExistentCity',
};
