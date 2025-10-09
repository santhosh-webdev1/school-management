import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherAssignmentService } from './teacher-assignment.service';
import { CreateTeacherAssignmentDto } from './dto/create-teacher-assignment.dto';
import { UpdateTeacherAssignmentDto } from './dto/update-teacher-assignment.dto';

@Controller('teacher-assignment')
export class TeacherAssignmentController {
  constructor(private readonly teacherAssignmentService: TeacherAssignmentService) {}

  @Post()
  assign(@Body() dto: CreateTeacherAssignmentDto) {
    return this.teacherAssignmentService.assignTeacher(dto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherAssignmentService.findAssignmentByTeacher(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeacherAssignmentDto: UpdateTeacherAssignmentDto) {
  //   return this.teacherAssignmentService.update(+id, updateTeacherAssignmentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherAssignmentService.removeAssignment(+id);
  }
}
