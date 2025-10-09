import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateTeacherDto } from "./dto/CreateTeacherDto";
import { TeacherAssignmentService } from "src/teacher-assignment/teacher-assignment.service";
import { UserRole } from "src/users/enums/user-role";


@Injectable()
export class AdminService {

    constructor(
        private readonly userService: UsersService,
        private readonly teacherAssignmentService: TeacherAssignmentService
    ) { }

    async createTeacher(dto: CreateTeacherDto, adminId: number) {

        const userDto = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            role: UserRole.TEACHER,
            createdById: adminId,
        }

        const teacher = await this.userService.createUser(userDto);

        const { dbToken, dbTokenExpiry, ...teacherData } = teacher;

        return teacher;
    }


    



}