import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { MailService } from "../mail/mail.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports : [
        UsersModule,
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : ( configService : ConfigService) =>({
                secret : configService.get<string>('JWT_SECRET'),
                signOptions : { expiresIn : '1h'}
            })
        })
    ],
    controllers : [AuthController],
    providers : [AuthService, MailService],
    exports : [AuthService, MailService]
})

export class AuthModule{}