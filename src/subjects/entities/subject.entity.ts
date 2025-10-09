import { Classes } from "src/classes/entities/classes.entity";
import { TeacherAssignment } from "src/teacher-assignment/entities/teacher-assignment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subjects {


    @PrimaryGeneratedColumn()
    id : number;

    @Column({ nullable : true})
    name : string;

    @Column({ unique : true })
    code : string;

    @OneToMany(() => TeacherAssignment, (ta) => ta.subject)
    teacherAssignments : TeacherAssignment[];
    
    @ManyToOne(() => Classes, (cls) => cls.subject)
    classes: Classes;

}
