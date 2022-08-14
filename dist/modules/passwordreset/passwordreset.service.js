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
exports.PasswordresetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const verificationcode_service_1 = require("../verificationcode/verificationcode.service");
const bcrypt = require("bcrypt");
const mailer_service_1 = require("../mailer/mailer.service");
let PasswordresetService = class PasswordresetService {
    constructor(userModel, verificationCodeModel, verificationService, mailerService) {
        this.userModel = userModel;
        this.verificationCodeModel = verificationCodeModel;
        this.verificationService = verificationService;
        this.mailerService = mailerService;
    }
    async checkEmail(emai) {
        try {
            const user = await this.userModel.findOne({ email: emai });
            if (!user)
                return false;
            return user._id;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sendCode(email) {
        try {
            let userid = await this.checkEmail(email);
            if (!userid)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: true
                };
            await this.verificationService.sendVerificationCode({ email, id: userid });
            return {
                message: "a 4-digit code was sent to your email, please verify your email",
                data: email,
                status: 200,
                isSuccess: true
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePassword({ code, password }, email) {
        try {
            let userid = await this.checkEmail(email);
            if (!userid)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const checkCode = await this.verificationCodeModel.findOne({
                user: userid,
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
                const salt = 10;
                const hashedPassword = await bcrypt.hash(password, salt);
                await this.userModel.updateOne({ _id: userid }, {
                    $set: { password: hashedPassword },
                });
                await this.mailerService.passwordReset(email);
                return {
                    message: "password succefully changed",
                    status: 200,
                    isSuccess: false
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
PasswordresetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('VerificationCode')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        verificationcode_service_1.VerficationService,
        mailer_service_1.MailerService])
], PasswordresetService);
exports.PasswordresetService = PasswordresetService;
//# sourceMappingURL=passwordreset.service.js.map