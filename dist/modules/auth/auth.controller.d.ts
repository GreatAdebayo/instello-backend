import { AuthService } from "./auth.service";
import { VerifyDto } from "./dto/verify.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(req: any, res: any): Promise<any>;
    verifySignIn(body: VerifyDto, req: any, res: any): Promise<any>;
}
