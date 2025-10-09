import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Classes } from "src/classes/entities/classes.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Subjects } from "src/subjects/entities/subject.entity";
import { TeacherAssignment } from "src/teacher-assignment/entities/teacher-assignment.entity";
import { UsersService } from "src/users/users.service";
import { UserRole } from "src/users/enums/user-role";


@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Classes)
        private classRepo: Repository<Classes>,

        @InjectRepository(Subjects)
        private subjectsRepo: Repository<Subjects>,

        @InjectRepository(Attendance)
        private attendanceRepo: Repository<Attendance>,

        @InjectRepository(TeacherAssignment)
        private teacherAssignmentRepo: Repository<TeacherAssignment>
    ) { }
    async getProfile(studentId: number): Promise<User> {
        const student = await this.userRepo.findOne({
            where: { id: studentId },
            relations: ['classes'],
        });
        if (!student) throw new NotFoundException('Student not found');
        if (student.role !== 'student')
            throw new NotFoundException('User is not a student');
        return student;
    }
    async getSubjects(studentId: number): Promise<Subjects[]> {

        const student = await this.getProfile(studentId);

        if (!student.classes)
            throw new NotFoundException('Student is not assigned to any class');


        const subjects = await this.subjectsRepo.find({
            where: { classes: { id: student.classes.id } }
        });

        return subjects;
    }
    async getAttendance(
        studentId: number,
        filters?: { date?: string; status?: string }
    ): Promise<Attendance[]> {
        const where: any = { student: { id: studentId } };

        if (filters?.date) where.date = filters.date;
        if (filters?.status) where.status = filters.status;

        return this.attendanceRepo.find({
            where,
            relations: ['classes', 'student', 'markedBy'],
            order: { date: 'DESC' },
        });

    }




}

