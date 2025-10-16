import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/users/user.type';

@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post('generate-code')
  @Roles(UserRole.ADMIN)
  async generateCode(@Body('name') name: string) {
    return await this.subjectsService.generateCode(name);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}

