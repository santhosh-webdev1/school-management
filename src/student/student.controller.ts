import { StudentService } from "./student.service";



export class StudentController{

    constructor(
        private readonly studentService : StudentService
    ){}

    
}