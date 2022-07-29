import { ResetDto } from './dto/reset.dto';
import { PasswordresetService } from './passwordreset.service';
export declare class PasswordresetController {
    private readonly passwordresetService;
    constructor(passwordresetService: PasswordresetService);
    sendCode(email: string, res: any): Promise<any>;
    updatePassword(body: ResetDto, email: string, res: any): Promise<any>;
}
