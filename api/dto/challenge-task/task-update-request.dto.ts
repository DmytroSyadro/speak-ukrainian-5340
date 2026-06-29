import { TaskRequestDto } from './task-request.dto';

export interface TaskUpdateRequestDto extends TaskRequestDto {
  challengeId: number;
}
