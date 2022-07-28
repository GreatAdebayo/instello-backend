import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    privateUserInfo(req: any, res: any): Promise<any>;
    publiceUserInfo(req: any, res: any): Promise<void>;
}
