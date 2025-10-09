import { Attendance } from "src/attendance/entities/attendance.entity";
import { TeacherAssignment } from "src/teacher-assignment/entities/teacher-assignment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('classes')
export class Classes {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    standard : string;

    @Column()
    section : string;

    @Column()
    start_year : number;

    @OneToMany(() => TeacherAssignment, (ta) => ta.classes)
    teacherAssignments : TeacherAssignment[];

    @OneToMany(() => Attendance, (attendance) => attendance.classes)
    attendanceRecords : Attendance[];

}
