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
exports.VerficationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const date = require("date-and-time");
const mailer_service_1 = require("../mailer/mailer.service");
let VerficationService = class VerficationService {
    constructor(verificationCodeModel, mailerService) {
        this.verificationCodeModel = verificationCodeModel;
        this.mailerService = mailerService;
    }
    async generateCode({ email, id }) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const ten_minutes_later = date.addMinutes(now, 10);
        try {
            const code = new this.verificationCodeModel({
                user: id,
                email,
                code: rand,
                exp: ten_minutes_later
            });
            await code.save();
            return rand;
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async sendVerificationCode({ email, id }) {
        const code = await this.generateCode({ email, id });
        await this.mailerService.sendVerificationCode({ email, code });
        return;
    }
};
VerficationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('VerificationCode')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailer_service_1.MailerService])
], VerficationService);
exports.VerficationService = VerficationService;
//# sourceMappingURL=verificationcode.service.js.map