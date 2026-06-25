export type WeekDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface ClubWorkTimeDto {
  id?: number;
  day: WeekDay;
  startTime: string;
  endTime: string;
}
