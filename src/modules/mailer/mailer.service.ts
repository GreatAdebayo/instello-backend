import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");

@Injectable()
export class MailerService {

    async mailerBoilerplate({ email, subject, output }: { email: string, subject: string, output: string }) {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.HOST_NAME,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL, // generated ethereal user
                    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            // send mail with defined transport object
            await transporter.sendMail({
                from: `"Instello 👻" <${process.env.EMAIL}>`, // sender address
                to: email, // list of receivers
                subject, // Subject line
                text: "Hello world", // plain text body
                html: output, // html body
            });
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    }



    async sendVerificationCode({ email, code }: { email: string, code: number }) {
        const output = `<b>${code}</b>`;
        const subject = "Verification Code"
        await this.mailerBoilerplate({ email, subject, output })
        return;
    }


    async welcomeMessage({ email, lastName }: { email: string, lastName: string }) {
        const output = `<b>Welcome ${lastName} to instello</b>`;
        const subject = "Great From Instello"
        await this.mailerBoilerplate({ email, subject, output })
        return;
    }


    async loginMessage({ email, lastName }: { email: string, lastName: string }) {
        const output = `<b>${lastName}, You just logged into your instello account</b>`;
        const subject = "Great From Instello"
        await this.mailerBoilerplate({ email, subject, output })
        return;
    }


    async passwordReset(email: string) {
        const output = `<b>You just changed your password</b>`;
        const subject = "Great From Instello"
        await this.mailerBoilerplate({ email, subject, output })
        return;
    }
}