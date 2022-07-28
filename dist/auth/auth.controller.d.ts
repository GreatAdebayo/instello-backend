import { AuthService } from "./auth.service";
import { VerifyDto } from "./dto/verify.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(req: any): Promise<{
        message: string;
        status: number;
        isSuccess: true;
        data: string;
    } | {
        message: string;
        data: any;
        status: number;
        isSuccess: false;
    }>;
    verifySignIn(body: VerifyDto, req: any): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: string;
    }>;
}
