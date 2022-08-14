import { SendCodeDto } from "./dto/sendcode.dto";
import { UserDto } from "./dto/user.dto";
import { VerifyDto } from "./dto/verify.dto";
import { SignupService } from "./signup.service";
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    defaultSignup(body: UserDto, res: any, req: any): Promise<any>;
    verify(body: VerifyDto, res: any): Promise<any>;
    resendCode(body: SendCodeDto, res: any): Promise<any>;
}
