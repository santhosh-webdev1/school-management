// src/user/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user.type';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string;
}


export class UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}