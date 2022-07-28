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
    welcomeMessage({ email, lastName }: {
        email: string;
        lastName: string;
    }): Promise<void>;
    loginMessage({ email, lastName }: {
        email: string;
        lastName: string;
    }): Promise<void>;
}
