import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {


    private transporter: nodemailer.Transporter;

    constructor(private config: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.config.get<string>('SMTP_HOST'),
            port: this.config.get<number>('SMTP_PORT'),
            auth: {
                user: this.config.get<string>('SMTP_USER'),
                pass: this.config.get<string>('SMTP_PASS')
            }
        })
    }

    async sendActivationLink(to: string, token: string) {
        const link = `http://localhost:5173/set-password?email=${encodeURIComponent(to)}&token=${encodeURIComponent(token)}`;

        const mailOptions = {
            from: this.config.get('MAIL_FROM'),
            to,
            subject: 'Set Your Password',
            html: `<p>Click the link below to set your password:</p>
             <a href="${link}">${link}</a>
             <p>This link will expire in 1 hour.</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send email:', error);
            // Optionally rethrow or handle gracefully
        }
        
    }

    async sendResetPasswordLink(to: string, token: string) {
        const link = `http://localhost:3000/reset-password?token=${token}`;

        const mailOptions = {
            from: `"School System" <${this.config.get('MAIL_FROM')}>`,
            to,
            subject: 'Reset Your Password',
            html: `<p>Click the link below to reset your password:</p>
             <a href="${link}">${link}</a>
             <p>This link will expire in 1 hour.</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send email:', error);
            // Optionally rethrow or handle gracefully
        }
    }
}