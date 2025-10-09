import { IsString, IsNotEmpty, IsNumber, IsDateString } from "class-validator";
import { Status } from "../enum/status";

export class CreateAttendanceDto {
    @IsNotEmpty()
    @IsNumber()
    classId: number;

    @IsNotEmpty()
    @IsNumber()
    teacherId: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNotEmpty({each:true})
    students:{
        studentId:number;
        status:Status;
    }[]

}
