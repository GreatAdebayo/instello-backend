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
exports.SignupController = void 0;
const common_1 = require("@nestjs/common");
const sendcode_dto_1 = require("./sendcode.dto");
const user_dto_1 = require("./user.dto");
const verify_dto_1 = require("./verify.dto");
const signup_service_1 = require("../signup.service");
let SignupController = class SignupController {
    constructor(signupService) {
        this.signupService = signupService;
    }
    async defaultSignup(body, res) {
        const response = await this.signupService.defaultSignup(body);
        return res.status(response.status).json(response);
    }
    async verify(body, res) {
        const response = await this.signupService.verify(body);
        return res.status(response.status).json(response);
    }
    async resendCode(body, res) {
        const response = await this.signupService.resendCode(body);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Post)('default'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "defaultSignup", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_dto_1.VerifyDto, Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('resendcode'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendcode_dto_1.SendCodeDto, Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "resendCode", null);
SignupController = __decorate([
    (0, common_1.Controller)('api/signup'),
    __metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupController);
exports.SignupController = SignupController;
//# sourceMappingURL=signup.controller.js.map