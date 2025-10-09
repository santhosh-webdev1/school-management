import { Repository } from 'typeorm';
import { Classes } from './entities/classes.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesService {
    private classRepo;
    constructor(classRepo: Repository<Classes>);
    create(createClassDto: CreateClassDto): Promise<Classes>;
    findAll(): Promise<Classes[]>;
    findById(id: number): Promise<Classes>;
    update(id: number, updateClassDto: UpdateClassDto): Promise<Classes>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
