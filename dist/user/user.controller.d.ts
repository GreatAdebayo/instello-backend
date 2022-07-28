import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userInfo(req: any, res: any): Promise<void>;
}
