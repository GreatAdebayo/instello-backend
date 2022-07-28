"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const verificationcode_service_1 = require("../verificationcode/verificationcode.service");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
let SignupService = class SignupService {
    constructor(userModel, verificationCodeModel, verificationService, jwtService, mailerService) {
        this.userModel = userModel;
        this.verificationCodeModel = verificationCodeModel;
        this.verificationService = verificationService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async checkUser(email) {
        try {
            const user = await this.userModel.findOne({ email }).select("-password");
            if (user)
                return user;
            return false;
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async defaultSignup({ firstName, lastName, email, password }, ip) {
        let response;
        if (await this.checkUser(email)) {
            return response = {
                message: "email already in use",
                status: 400,
                isSuccess: false
            };
        }
        else {
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password, salt);
            try {
                const user = new this.userModel({
                    userName: lastName,
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                });
                user.ip.push(ip);
                await user.save();
                await this.verificationService.sendVerificationCode({ email: user.email, id: user._id });
                return response = {
                    message: "a 4-digit code was sent to your email, please verify your email",
                    data: user.email,
                    status: 200,
                    isSuccess: true
                };
            }
            catch (error) {
                throw new common_1.ForbiddenException('something is wrong!');
            }
        }
    }
    async verify({ email, code }) {
        let response;
        try {
            const user = await this.checkUser(email);
            if (!user)
                return response = {
                    message: "email not found",
                    status: 400,
                    isSuccess: false
                };
            if (user.email_verified)
                return response = {
                    message: "email already verified",
                    status: 400,
                    isSuccess: false
                };
            const checkCode = await this.verificationCodeModel.findOne({
                user: user._id,
                code
            });
            if (!checkCode)
                return response = {
                    message: "incorrect code",
                    status: 400,
                    isSuccess: false
                };
            const exp_date = new Date(checkCode.exp);
            const present_date = new Date();
            if (exp_date.getTime() > present_date.getTime()) {
                await this.userModel.updateOne({ _id: user._id }, {
                    $set: { email_verified: true },
                });
                const payload = { sub: user._id };
                await this.mailerService.welcomeMessage({ email: user.email, lastName: user.lastName });
                return response = {
                    message: "verified succesfully",
                    status: 200,
                    isSuccess: true,
                    data: this.jwtService.sign(payload)
                };
            }
            else {
                return response = {
                    message: "code expired",
                    status: 400,
                    isSuccess: false
                };
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async resendCode({ email }) {
        let response;
        try {
            const user = await this.checkUser(email);
            if (!user)
                return response = {
                    message: "email not found",
                    status: 400,
                    isSuccess: false,
                };
            await this.verificationService.sendVerificationCode({ email: user.email, id: user._id });
            return response = {
                message: "a 4-digit code has been sent to your email, please verify your email",
                data: email,
                status: 200,
                isSuccess: true
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
};
SignupService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('VerificationCode')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        verificationcode_service_1.VerficationService,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], SignupService);
exports.SignupService = SignupService;
//# sourceMappingURL=signup.service.js.map