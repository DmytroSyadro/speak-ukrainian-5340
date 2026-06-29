export interface TaskRequestDto {
  name: string;
  headerText: string;
  description: string;
  picture: string;
  startDate: string; // e.g., "2026-06-28"
  isActive: boolean;
}
