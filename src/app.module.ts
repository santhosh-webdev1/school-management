import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { TeacherAssignmentModule } from './teacher-assignment/teacher-assignment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize : true,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      })
    }),

    UsersModule,

    AuthModule,

    SubjectsModule,

    ClassesModule,

    TeacherAssignmentModule,

    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
