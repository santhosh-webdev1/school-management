import { Controller, Post, Body, UseGuards, Req, Get, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

import { Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController{

    constructor(
        private readonly userService : UsersService
    ) {}


    @Post()
    async createUser(@Body() dto : CreateUserDto) : Promise<User>{
        return this.userService.createUser(dto);
    }

    @Get()
    async findAll() : Promise<User[]>{
        return this.userService.findAll();
    }

    @Patch(':id')
    async updateUser(@Param('id') id : number, @Body() dto : UpdateUserDto) : Promise<User>{
        return this.userService.updateUser(id, dto);
    }

    @Delete(':id')
    async removeUser(
        @Param('id', ParseIntPipe) id: number, // automatically converts string to number
    ) {
    return this.userService.deleteUser(id);
  }

}

