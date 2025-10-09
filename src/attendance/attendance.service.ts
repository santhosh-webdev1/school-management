import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { User } from 'src/users/entities/user.entity';
import { Classes } from 'src/classes/entities/classes.entity';
import { Status } from './enum/status';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,

    @InjectRepository(User)
    private usersRepo: Repository<User>,

    @InjectRepository(Classes)
    private classesRepo: Repository<Classes>,
  ) { }



  async markAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance[]> {

    const cls = await this.classesRepo.findOne({ where: { id: createAttendanceDto.classId } });
    if (!cls) throw new NotFoundException('Class not found');


    const teacher = await this.usersRepo.findOne({ where: { id: createAttendanceDto.teacherId } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    if (teacher.role !== 'teacher') throw new NotFoundException('User is not a teacher');

    const records: Attendance[] = [];


    for (const s of createAttendanceDto.students) {
      const student = await this.usersRepo.findOne({ where: { id: s.studentId } });
      if (!student) throw new NotFoundException(`User with ID ${s.studentId} not found`);
      if (student.role !== 'student') throw new NotFoundException(`User with ID ${s.studentId} is not a student`);


      const attendance = this.attendanceRepo.create({
        student,
        classes: cls,
        markedBy: teacher,
        status: s.status,
        date: createAttendanceDto.date,
      });


      records.push(await this.attendanceRepo.save(attendance));
    }


    return records;
  }




  async getByClassAndDate(classId: number, date: string): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { classes: { id: classId }, date },
      relations: ['student', 'classes', 'markedBy'],
    });
  }


  async getByStudent(studentId: number): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { student: { id: studentId } },
      relations: ['classes', 'markedBy', 'student'],
    });
  }


  async getAllClassesAttendanceByDate(date: string): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { date },
      relations: ['student', 'classes', 'markedBy'],
    });
  }

  async updateAttendance(id: number, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceRepo.findOne({ where: { id } });
    if (!attendance) throw new NotFoundException('Attendance record not found');


    Object.assign(attendance, updateAttendanceDto);
    return this.attendanceRepo.save(attendance);
  }


  async removeAttendance(id: number): Promise<{ message: string }> {
    const result = await this.attendanceRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Attendance record not found');
    return { message: 'Attendance record deleted successfully' };
  }

}


