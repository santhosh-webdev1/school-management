import { IsNotEmpty, IsNumber} from "class-validator";
 
export class CreateTeacherAssignmentDto {
   @IsNumber()
   @IsNotEmpty()
   teacherId:number;
 
   @IsNumber()
   @IsNotEmpty()
   classId:number;
 
   @IsNumber()
   @IsNotEmpty()
   subjectId:number;
}