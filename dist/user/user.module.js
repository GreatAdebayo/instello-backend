"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schema/user.schema");
const follow_schema_1 = require("../schema/follow.schema");
const post_schema_1 = require("../schema/post.schema");
const redisStore = require("cache-manager-redis-store");
const throttler_1 = require("@nestjs/throttler");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Follow', schema: follow_schema_1.FollowSchema },
                { name: 'Post', schema: post_schema_1.PostSchema },
            ]), common_1.CacheModule.register({
                ttl: 30, store: redisStore, socket: {
                    host: 'localhost',
                    port: 6379
                }
            }), throttler_1.ThrottlerModule.forRoot()],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map