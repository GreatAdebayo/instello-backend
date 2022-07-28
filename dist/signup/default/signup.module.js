"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schema/user.schema");
const verificationcode_schema_1 = require("../../schema/verificationcode.schema");
const verificationcode_module_1 = require("../../verificationcode/verificationcode.module");
const signup_controller_1 = require("./signup.controller");
const signup_service_1 = require("./signup.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../jwt.constant");
const mailer_module_1 = require("../../mailer/mailer.module");
let SignupModule = class SignupModule {
};
SignupModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'VerificationCode', schema: verificationcode_schema_1.VerificationCodeSchema }
            ]), verificationcode_module_1.VerificationModule, jwt_1.JwtModule.register({
                secret: jwt_constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '60s' },
            }), mailer_module_1.MailerModule],
        controllers: [signup_controller_1.SignupController],
        providers: [signup_service_1.SignupService]
    })
], SignupModule);
exports.SignupModule = SignupModule;
//# sourceMappingURL=signup.module.js.map