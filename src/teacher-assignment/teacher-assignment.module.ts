import { Module } from '@nestjs/common';
import { TeacherAssignmentService } from './teacher-assignment.service';
import { TeacherAssignmentController } from './teacher-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAssignment } from './entities/teacher-assignment.entity';
import { UsersModule } from 'src/users/users.module';
import { ClassesModule } from 'src/classes/classes.module';
import { SubjectsModule } from 'src/subjects/subjects.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([TeacherAssignment]),
    UsersModule,
    ClassesModule,
    SubjectsModule
  ],
  controllers: [TeacherAssignmentController],
  providers: [TeacherAssignmentService],
})
export class TeacherAssignmentModule {}
