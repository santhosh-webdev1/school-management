import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Min, MinLength } from "class-validator";
import { UserRole } from "../enums/user-role";
import { User } from "../entities/user.entity";


export class CreateUserDto{

    @IsString()
    firstName : string;

    @IsOptional()
    @IsString()
    lastName : string

    @IsEmail()
    email : string;

    @IsEnum(UserRole)
    role : UserRole;

    @IsOptional()
    createdById? : number;
}

