import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  controllers : [UserController],
  providers: [UsersService],
  exports : [UsersService],
})
export class UsersModule {}
