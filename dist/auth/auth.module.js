"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schema/user.schema");
const local_strategy_1 = require("./local.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../jwt/jwt.constant");
const verificationcode_module_1 = require("../verificationcode/verificationcode.module");
const verificationcode_schema_1 = require("../schema/verificationcode.schema");
const mailer_module_1 = require("../mailer/mailer.module");
const throttler_1 = require("@nestjs/throttler");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'VerificationCode', schema: verificationcode_schema_1.VerificationCodeSchema }
            ]), jwt_1.JwtModule.register({
                secret: jwt_constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '60000s' },
            }), verificationcode_module_1.VerificationModule, mailer_module_1.MailerModule, throttler_1.ThrottlerModule.forRoot()],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map