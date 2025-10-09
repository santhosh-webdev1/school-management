import { BadRequestException, Body, Controller, Post, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SetPasswordDto } from "./dto/set-password.dto";
import { LoginUserDto } from "./dto/login.dto";


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('validate-token')
    async validateToken(@Query('token') token: string, @Query('email') email: string) {
        if (!token || !email) throw new BadRequestException('Token and email are required');
        return this.authService.validateToken(email, token);
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        return this.authService.setPassword(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        const result = await this.authService.login(user);
        return result; // returns { message, accessToken, user }
    }

}