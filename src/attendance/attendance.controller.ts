import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  markAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.markAttendance(createAttendanceDto);
  }

  @Get('class')
  getByClassAndDate( 
    @Query('classId') classId: string,
    @Query('date') date: string,){
    return this.attendanceService.getByClassAndDate(+classId, date);
  }

  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.attendanceService.getByStudent(+studentId);
  }
  @Get('all')
  getAllByDate(@Query('date') date: string) {
    return this.attendanceService.getAllClassesAttendanceByDate(date);
  }

  @Patch(':id')
  updateAttendance(
    @Param('id') id: string,
    @Body() UpdateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.updateAttendance(+id, UpdateAttendanceDto);
  }

  @Delete(':id')
  removeAttendance(@Param('id') id: string) {
    return this.attendanceService.removeAttendance(+id);
  }
}
