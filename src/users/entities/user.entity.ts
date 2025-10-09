import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role";
import { TeacherAssignment } from "src/teacher-assignment/entities/teacher-assignment.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";



@Entity('users')
export class User {

    // common users fields
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    email : string;

    @Column({nullable : true})
    password : string;

    @Column({nullable : false})
    firstName : string;

    @Column({ nullable : true })
    lastName : string;

    @Column({ type : 'enum', enum : UserRole})
    role : UserRole;

    @Column({ default : false })
    is_verified : boolean;

    @Column({ type : 'varchar',nullable : true})
    dbToken : string | null;

    @Column({ type : 'timestamp', nullable : true})
    dbTokenExpiry : Date | null;


    // teacher fields
    @Column({ nullable : true})
    phoneNumber : string;

    @Column({ type : 'date', nullable : true})
    hire_date : Date;
    
    @Column({ type : 'date', nullable : true })
    date_of_birth : Date;


    // student
    @Column({ type : 'text', nullable : true })
    address : string;

    @Column({ nullable : true })
    roll_no : string;


    // who create the users
    @OneToMany(() => User,(user) => user.createdBy)
    createdUsers : User[];

    @ManyToOne(() => User, (user) => user.createdUsers, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'createdById' }) // this explicitly tells TypeORM the FK column name
    createdBy: User | null;


    // relationships
    @OneToMany(() => TeacherAssignment, (ta) => ta.teacher)
    teacherAssignments : TeacherAssignment[];

    // student
    @OneToMany(() => Attendance, (attendance) => attendance.student)
    studentAttendance : Attendance[];

    @OneToMany(() => Attendance, (attendance) => attendance.markedBy)
    markedAttendance : Attendance[];

    
    @CreateDateColumn({ type : 'timestamp'})
    createdAt : Date;

    @UpdateDateColumn({ type : 'timestamp' })
    updatedAt : Date;
}
