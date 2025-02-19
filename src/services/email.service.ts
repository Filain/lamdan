import nodemailer, { Transporter } from 'nodemailer';

import { config } from '../config/config';

export class EmailService {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email_user,
                pass: config.email_password,
            },
        });
    }
    public async sendEmail(
        to: string,
        subject: string,
        html: string,
    ): Promise<boolean> {
        try {
            await this.transporter.sendMail({
                from: config.email_user,
                to,
                subject,
                html,
            });
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();
