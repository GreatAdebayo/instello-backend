import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    privateUserInfo(req: any, res: any): Promise<any>;
    publiceUserInfo(username: string, res: any): Promise<any>;
    searchUser(res: any, page: number, limit: number, username: string): Promise<any>;
}
