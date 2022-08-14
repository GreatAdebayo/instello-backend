import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
export declare class SubscriptionMiddleware implements NestMiddleware {
    private readonly userModel;
    constructor(userModel: Model<UserDto>);
    use(req: Request, res: Response, next: NextFunction): void;
}
