export interface ChallengeTaskDto {
  id: number;
  name: string;
  headerText: string;
  description: string;
  picture: string;
  startDate: string;
  challengeId: number;
  isActive: boolean;
}

export interface ChallengeUserDto {
  id: number;
  firstName: string;
  lastName: string;
  urlLogo: string;
}

export interface ChallengeResponseDto {
  id: number;
  name: string;
  title: string;
  description: string;
  picture: string;
  sortNumber: number;
  isActive: boolean;
  tasks: ChallengeTaskDto[];
  user: ChallengeUserDto;
  registrationLink: string;
}
