"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    async mailerBoilerplate({ email, subject, output }) {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.HOST_NAME,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            await transporter.sendMail({
                from: `"Instello 👻" <${process.env.EMAIL}>`,
                to: email,
                subject,
                text: "Hello world",
                html: output,
            });
            return;
        }
        catch (error) {
            return;
        }
    }
    async sendVerificationCode({ email, code }) {
        const output = `<b>${code}</b>`;
        const subject = "Verification Code";
        await this.mailerBoilerplate({ email, subject, output });
        return;
    }
    async welcomeMessage({ email, lastName }) {
        const output = `<b>Welcome ${lastName} to instello</b>`;
        const subject = "Great From Instello";
        await this.mailerBoilerplate({ email, subject, output });
        return;
    }
    async loginMessage({ email, lastName }) {
        const output = `<b>${lastName}, You just logged into your instello account</b>`;
        const subject = "Great From Instello";
        await this.mailerBoilerplate({ email, subject, output });
        return;
    }
    async passwordReset(email) {
        const output = `<b>You just changed your password</b>`;
        const subject = "Great From Instello";
        await this.mailerBoilerplate({ email, subject, output });
        return;
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)()
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map