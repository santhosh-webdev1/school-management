import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from './entities/classes.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
  export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classRepo: Repository<Classes>
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Classes> {
    const cls = this.classRepo.create(createClassDto);
    return this.classRepo.save(cls);
  }

  async findAll(): Promise<Classes[]> {
    return this.classRepo.find();
  }

  async findById(id: number): Promise<Classes> {
    const cls = await this.classRepo.findOne({ where: { id } });
    if (!cls) throw new NotFoundException(`Class with ID ${id} not found`);
    return cls;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Classes> {
    const cls = await this.findById(id);
    Object.assign(cls, updateClassDto);
    return this.classRepo.save(cls);
  }

  async delete(id: number): Promise<{ message: string }> {
    const cls = await this.classRepo.findOne({ where: { id } });
    if (!cls) throw new NotFoundException(`Class with ID ${id} not found`);
    await this.classRepo.remove(cls);
    return { message: `Class with ID ${id} has been deleted` };
  }


}





