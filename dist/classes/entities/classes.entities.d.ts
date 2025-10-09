import { Attendance } from "src/attendance/entities/attendance.entity";
import { TeacherAssignment } from "src/teacher-assignment/entities/teacher-assignment.entity";
export declare class Classes {
    id: number;
    standard: string;
    section: string;
    start_year: number;
    teacherAssignments: TeacherAssignment[];
    attendanceRecords: Attendance[];
}
