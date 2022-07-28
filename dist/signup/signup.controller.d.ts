import { SendCodeDto } from "./default/dto/sendcode.dto";
import { UserDto } from "./default/dto/user.dto";
import { VerifyDto } from "./default/dto/verify.dto";
import { SignupService } from "./signup.service";
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    defaultSignup(body: UserDto, res: any): Promise<any>;
    verify(body: VerifyDto, res: any): Promise<any>;
    resendCode(body: SendCodeDto, res: any): Promise<any>;
}
