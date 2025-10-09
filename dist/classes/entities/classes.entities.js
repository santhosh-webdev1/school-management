"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classes = void 0;
const attendance_entity_1 = require("src/attendance/entities/attendance.entity");
const teacher_assignment_entity_1 = require("src/teacher-assignment/entities/teacher-assignment.entity");
const typeorm_1 = require("typeorm");
let Classes = class Classes {
    id;
    standard;
    section;
    start_year;
    teacherAssignments;
    attendanceRecords;
};
exports.Classes = Classes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Classes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Classes.prototype, "standard", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Classes.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Classes.prototype, "start_year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teacher_assignment_entity_1.TeacherAssignment, (ta) => ta.classes),
    __metadata("design:type", Array)
], Classes.prototype, "teacherAssignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.classes),
    __metadata("design:type", Array)
], Classes.prototype, "attendanceRecords", void 0);
exports.Classes = Classes = __decorate([
    (0, typeorm_1.Entity)('classes')
], Classes);
//# sourceMappingURL=classes.entities.js.map