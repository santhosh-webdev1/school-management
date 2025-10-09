import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    create(createClassDto: CreateClassDto): Promise<Classes>;
    findAll(): Promise<Classes[]>;
    findOne(id: string): Promise<Classes>;
    update(id: string, updateClassDto: UpdateClassDto): Promise<Classes>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
