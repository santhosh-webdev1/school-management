import { UsersService } from "src/users/users.service";
import { SetPasswordDto } from "./dto/set-password.dto";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService : JwtService
    ) { }

    async setPassword(dto: SetPasswordDto) {

        const { email, token, password } = dto;      

        const user = await this.userService.findByEmail(email);

        if (!user) throw new BadRequestException("Invalid or missing token");

        if (!user.dbToken) {
            throw new BadRequestException('No active token. Please request a new reset link.');
        }

        const isMatch = await bcrypt.compare(token, user.dbToken);
        if (!isMatch) throw new BadRequestException("Invalid token");

        if (!user.dbTokenExpiry || user.dbTokenExpiry < new Date()) {
            throw new BadRequestException("Link expired");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.dbToken = null;
        user.dbTokenExpiry = null;
        user.is_verified = true;

        await this.userService.updateUser(user.id, user);

        return { message: 'Password set successfully, please login with password' };
    }

    async validateToken(email: string, token: string) {

        const user = await this.userService.findByEmail(email);

        if (!user) return { valid: true, reason: "User not found" };

        if (!user.dbToken) return { valid: false, reason: "Invalid token" };

        const isMatch = await bcrypt.compare(token, user.dbToken);

        if (!isMatch) return { valid: false, reason: "Invalid token" };

        if (!user.dbTokenExpiry || user.dbTokenExpiry < new Date()) {
            return { valid: false, reason: "Token Expired" };
        }

        return { valid: true };
    }


    // validation for login
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user || !user.password) {
            throw new BadRequestException('User not found or password not set');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new BadRequestException('Invalid password');
        }

        // sanitize
        const { password: _pwd, dbToken, dbTokenExpiry, ...safeUser } = user;
        return safeUser;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1h' });

        return {
            message: 'Login successful',
            accessToken,
            user,
        };
    }



}