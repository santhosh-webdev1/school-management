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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const classes_entity_1 = require("./entities/classes.entity");
let ClassesService = class ClassesService {
    classRepo;
    constructor(classRepo) {
        this.classRepo = classRepo;
    }
    async create(createClassDto) {
        const cls = this.classRepo.create(createClassDto);
        return this.classRepo.save(cls);
    }
    async findAll() {
        return this.classRepo.find();
    }
    async findById(id) {
        const cls = await this.classRepo.findOne({ where: { id } });
        if (!cls)
            throw new common_1.NotFoundException(`Class with ID ${id} not found`);
        return cls;
    }
    async update(id, updateClassDto) {
        const cls = await this.findById(id);
        Object.assign(cls, updateClassDto);
        return this.classRepo.save(cls);
    }
    async delete(id) {
        const cls = await this.classRepo.findOne({ where: { id } });
        if (!cls)
            throw new common_1.NotFoundException(`Class with ID ${id} not found`);
        await this.classRepo.remove(cls);
        return { message: `Class with ID ${id} has been deleted` };
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(classes_entity_1.Classes)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ClassesService);
//# sourceMappingURL=classes.service.js.map