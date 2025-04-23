import { Role } from "../entities/Role";

interface IUser {
  user_id: number;
  full_name: string;
  title: string;
  proof: string;
  specialty: string;
  active: boolean;
  avatar?: string;
  email: string;
  password: string;
  role_id: number;
  role?: Role;
  created_at: Date;
  updated_at: Date;
} 

interface IUserDTO {
  full_name: string;
  title: string;
  proof: string;
  specialty: string;
  active: boolean;
  avatar?: string;
  email: string;
  password: string;
  role_id: number;
}

interface IUserLoginDTO {
  email: string;
  password: string;
}

interface IUserForgotPasswordDTO {
  email: string;
}

interface IUserResetPasswordDTO {
  token: string;
  password: string;
}

interface IUserChangePasswordDTO {
  old_password: string;
  new_password: string;
}

interface IUserVerifyEmailDTO {
  token: string;
}

interface IUserVerifyEmailResponseDTO {
  message: string;
}

interface IRegisterDTO {
  full_name: string;
  title: string;
  proof: string;
  specialty: string;
  avatar?: string;
  email: string;
  password: string;
}

interface IUserResponse {
  user_id: number;
  full_name: string;
  title: string;
  proof: string;
  specialty: string;
  active: boolean;
  avatar?: string;
  email: string;
  role_id: number;
  role?: Role;
  created_at: Date;
  updated_at: Date;
}

export {
  IUser,
  IUserDTO,
  IUserLoginDTO,
  IUserForgotPasswordDTO,
  IUserResetPasswordDTO,
  IUserChangePasswordDTO,
  IUserVerifyEmailDTO,
  IUserVerifyEmailResponseDTO,
  IRegisterDTO,
  IUserResponse
};