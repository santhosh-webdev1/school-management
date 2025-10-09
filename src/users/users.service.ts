import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { UserRole } from './enums/user-role';



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private mailService: MailService
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({
      where: { role },
    });
  }

  async findById(id: number): Promise<User> {

    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) throw new BadRequestException("User not found");

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user =  await this.userRepository.findOne({
      where: { email },
      relations: ['createdBy'],
    });

    return user;
  }


  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {

    const user = await this.findById(id);

    Object.assign(user, dto);

    return this.userRepository.save(user);
  }

  async getCreatedUsers(createdById: number): Promise<User[]> {
    return this.userRepository.find({
      where: { createdBy: { id: createdById } },
      relations: ['createdBy'],
    });
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException(`User not found with Id : ${id}`);

    await this.userRepository.remove(user);

    return { message: `User Id : ${id} Deleted successfully` };
  }


  //creating the teacher and student by admin
  async createUser(dto: CreateUserDto) {

    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) throw new BadRequestException("Email already exists");

    const { rawToken, tokenHash, expiry } = await this.generateActivationToken();

    const user = this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      role: dto.role,
      createdBy: dto.createdById ? { id: dto.createdById } : null,
      dbToken: tokenHash,
      dbTokenExpiry: expiry,
      is_verified: false
    });

    const savedUser = await this.userRepository.save(user);

    await this.sendActivationEmail(user, rawToken);



    return savedUser;
  }



  // helper function
  private async generateActivationToken() {

    const rawToken = crypto.randomBytes(32).toString('hex');

    const tokenHash = await bcrypt.hash(rawToken, 10);

    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    return { rawToken, tokenHash, expiry };
  }

  private async sendActivationEmail(user: User, rawToken: string) {
    await this.mailService.sendActivationLink(user.email, rawToken);
  }

}
