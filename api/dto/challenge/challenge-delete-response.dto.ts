export interface ChallengeDeleteTaskDto {
  id: number;
  name: string;
}

export interface ChallengeDeleteResponseDto {
  id: number;
  name: string;
  tasks: ChallengeDeleteTaskDto[];
}
