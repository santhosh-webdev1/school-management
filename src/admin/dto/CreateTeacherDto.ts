import { IsEmail, IsNotEmpty } from "class-validator";



export class CreateTeacherDto{

    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    lastName : string;

    @IsEmail()
    email : string;
}