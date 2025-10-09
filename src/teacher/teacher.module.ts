import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { AttendanceModule } from "src/attendance/attendance.module";
import { ClassesModule } from "src/classes/classes.module";
import { SubjectsModule } from "src/subjects/subjects.module";


@Module({
    
    imports : [
        UsersModule,
        AttendanceModule,
        ClassesModule,
        SubjectsModule,
    ],
    providers : [TeacherService],
    controllers : [TeacherController]
})

export class TeacherModule{}