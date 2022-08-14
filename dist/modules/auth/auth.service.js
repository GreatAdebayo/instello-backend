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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const verificationcode_service_1 = require("../verificationcode/verificationcode.service");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthService = class AuthService {
    constructor(userModel, verificationCodeModel, jwtService, verificationService, mailerService) {
        this.userModel = userModel;
        this.verificationCodeModel = verificationCodeModel;
        this.jwtService = jwtService;
        this.verificationService = verificationService;
        this.mailerService = mailerService;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }
    async signIn(user, ip) {
        try {
            const checkIp = user.ip.find((item) => item == ip);
            if (checkIp) {
                const payload = { sub: user.id };
                return {
                    message: "signin successful",
                    status: 200,
                    isSuccess: true,
                    data: this.jwtService.sign(payload)
                };
            }
            else {
                await this.userModel.updateOne({ _id: user._id }, {
                    $set: { device_verified: false },
                });
                await this.verificationService.sendVerificationCode({ email: user.email, id: user._id });
                return {
                    message: "a new device detected, a 4-digit code was sent to your email, please verify",
                    data: user.email,
                    status: 400,
                    isSuccess: false
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifySignIn({ email, code }, ip) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user)
                return {
                    message: "email not found",
                    status: 400,
                    isSuccess: false
                };
            if (user.device_verified)
                return {
                    message: "device already verified",
                    status: 400,
                    isSuccess: false
                };
            const checkCode = await this.verificationCodeModel.findOne({
                user: user._id,
                code
            });
            if (!checkCode)
                return {
                    message: "incorrect code",
                    status: 400,
                    isSuccess: false
                };
            const exp_date = new Date(checkCode.exp);
            const present_date = new Date();
            if (exp_date.getTime() > present_date.getTime()) {
                const newIpArr = user.ip;
                newIpArr.push(ip);
                await this.userModel.updateOne({ _id: user._id }, {
                    $set: { device_verified: true, ip: newIpArr },
                });
                const payload = { sub: user._id };
                await this.mailerService.loginMessage({ email: user.email, lastName: user.lastName });
                return {
                    message: "verified succesfully",
                    status: 200,
                    isSuccess: true,
                    data: this.jwtService.sign(payload)
                };
            }
            else {
                return {
                    message: "code expired",
                    status: 400,
                    isSuccess: false
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('VerificationCode')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        verificationcode_service_1.VerficationService,
        mailer_service_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map