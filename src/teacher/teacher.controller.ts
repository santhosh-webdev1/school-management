import { TeacherService } from "./teacher.service";


export class TeacherController{

    constructor(
        private readonly teacherService : TeacherService,
    ) {}
}