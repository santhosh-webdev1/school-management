import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherAssignmentDto } from './dto/create-teacher-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAssignment } from './entities/teacher-assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Subjects } from 'src/subjects/entities/subject.entity';
import { Classes } from 'src/classes/entities/classes.entity';
import { UserRole } from 'src/users/enums/user-role';
import { Subject } from 'typeorm/persistence/Subject.js';
import { UsersService } from 'src/users/users.service';
import { ClassesService } from 'src/classes/classes.service';
import { SubjectsService } from 'src/subjects/subjects.service';


@Injectable()
export class TeacherAssignmentService {
  constructor(
    private readonly userService: UsersService,
    private readonly classService: ClassesService,
    private readonly subjectRepo: SubjectsService,
    @InjectRepository(TeacherAssignment) private readonly assignTeacherRepo: Repository<TeacherAssignment>
  ) { }

  //teacher assign
  async assignTeacher(dto: CreateTeacherAssignmentDto) {
    const teacher = await this.userService.findById(dto.teacherId);
    if (!teacher) return new NotFoundException('Teacher NOt Found');
    
    const classes = await this.classService.findById(dto.classId);
    if (!classes) return new NotFoundException('Class Not Found');
    
    const subject = await this.subjectRepo.findById(dto.subjectId);
    if (!subject)  return new NotFoundException("Subject Not Found")
    

    const assignment = this.assignTeacherRepo.create({ teacher, subject, classes });
    return this.assignTeacherRepo.save(assignment)
  }

  //assign to a teacher
  async findAssignmentByTeacher(teacherId: number) {
    return this.assignTeacherRepo.find({ where: { id: teacherId }, relations: ['teacher', 'subject', 'classes'] })
  }

  //assign to a class
  async findAssignmentByClass(classId: number) {
    return this.assignTeacherRepo.find({ where: { id: classId }, relations: ['teacher', 'subject', 'classes'] })
  }



  //remove
  async removeAssignment(id: number) {
    const assignment = await this.assignTeacherRepo.findOne({ where: { id } })
    if (!assignment) {
      return new NotFoundException('Assignment Not Found')
    }
    return this.assignTeacherRepo.remove(assignment)
  }
}