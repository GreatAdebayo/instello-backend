export declare class MailerService {
    mailerBoilerplate({ email, subject, output }: {
        email: string;
        subject: string;
        output: string;
    }): Promise<void>;
    sendVerificationCode({ email, code }: {
        email: string;
        code: number;
    }): Promise<void>;
}
