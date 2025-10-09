import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOne({
      where: [{ name: createSubjectDto.name }, { code: createSubjectDto.code }],
    });
    if (existingSubject) {
      throw new BadRequestException('Subject name or code already exists');
    }

    const subject = this.subjectRepository.create(createSubjectDto);
    return await this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      relations: ['assignments', 'assignments.teacher', 'assignments.class'],
    });
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['assignments', 'assignments.teacher', 'assignments.class'],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, updateSubjectDto);
    return await this.subjectRepository.save(subject);
  }

  async remove(id: string): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.update(id, { isActive: false });
  }
}

