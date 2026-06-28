export type UserRoleName = 'ROLE_USER' | 'ROLE_MANAGER';

export interface SignupRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  roleName: UserRoleName;
}

export interface SuccessRegistrationDto {
  id: number;
  email: string;
  roleName: UserRoleName;
}
