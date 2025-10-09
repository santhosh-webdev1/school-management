import { Module } from "@nestjs/common";
import { AttendanceModule } from "src/attendance/attendance.module";
import { ClassesModule } from "src/classes/classes.module";
import { SubjectsModule } from "src/subjects/subjects.module";
import { UsersModule } from "src/users/users.module";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";


@Module({
    imports : [
        UsersModule,
        ClassesModule,
        SubjectsModule,
        AttendanceModule,
    ],
    providers : [StudentService],
    controllers : [StudentController],
    exports : [StudentService]
})

export class StudentModule{}