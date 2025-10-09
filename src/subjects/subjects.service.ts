import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subjects } from './entities/subject.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SubjectsService{
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepo: Repository<Subjects>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
    const subject = this.subjectsRepo.create(createSubjectDto);
    return this.subjectsRepo.save(subject);
  }

  async findAll(): Promise<Subjects[]> {
    return this.subjectsRepo.find();
  }

  async findById(id: number): Promise<Subjects> {
    const subject = await this.subjectsRepo.findOne({ 
      where: { id }
      
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subjects> {
    const subject = await this.findById(id);
    Object.assign(subject, updateSubjectDto);
    return this.subjectsRepo.save(subject);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.subjectsRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Subject not found');
    return { message: 'Subject deleted successfully' };
  }



}