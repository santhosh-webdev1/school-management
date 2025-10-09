import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }


    @Get(':id/profile')
    async getProfile(@Param('id') id: number) {
        return this.studentService.getProfile(id);
    }
    @Get(':id/subjects')
    async getSubjects(@Param('id') id: number) {
        return this.studentService.getSubjects(id);
    }
    @Get(':id/attendance')
    async getAttendance(
        @Param('id') id: number,
        @Query('date') date?: string,
        @Query('status') status?: string,
    ) {
        return this.studentService.getAttendance(id, { date, status });
    }
}
