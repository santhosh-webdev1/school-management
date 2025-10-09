import { IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CreateClassDto {

    @IsString()
    @IsNotEmpty()
    standard: string;

    @IsString()
    @IsNotEmpty()
    section : string;

    @IsNumber()
    @IsNotEmpty()
    start_year: number;

    
}
