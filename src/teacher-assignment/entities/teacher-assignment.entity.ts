import { Classes } from "src/classes/entities/classes.entity";
import { Subjects } from "src/subjects/entities/subject.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('teacher_assignments')
export class TeacherAssignment {

    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => User, (user) => user.teacherAssignments, { onDelete : 'CASCADE'} )
    teacher : User;

    @ManyToOne(() => Subjects, (subject) => subject.teacherAssignments, { onDelete : 'CASCADE'})
    subject : Subjects;

    @ManyToOne(() => Classes, (classes) => classes.teacherAssignments, { onDelete : 'CASCADE'})
    classes : Classes;
}
