import { Classes } from "src/classes/entities/classes.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status";


@Entity('attendance')
export class Attendance {
    
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => User, (user) => user.studentAttendance, { onDelete : 'CASCADE' })
    student : User;

    @ManyToOne(() => Classes, (classes) => classes.attendanceRecords, {onDelete : 'CASCADE'})
    classes : Classes;

    @Column({ type : 'date'})
    date : string;

    @Column({type : 'enum', enum : Status})
    status : Status;

    @ManyToOne(() => User, (user) => user.markedAttendance, { onDelete : 'SET NULL'})
    markedBy : User;

}
