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
exports.PasswordresetController = void 0;
const common_1 = require("@nestjs/common");
const reset_dto_1 = require("./dto/reset.dto");
const passwordreset_service_1 = require("./passwordreset.service");
const throttler_1 = require("@nestjs/throttler");
let PasswordresetController = class PasswordresetController {
    constructor(passwordresetService) {
        this.passwordresetService = passwordresetService;
    }
    async sendCode(email, res) {
        const response = await this.passwordresetService.sendCode(email);
        return res.status(response.status).json(response);
    }
    async updatePassword(body, email, res) {
        const response = await this.passwordresetService.updatePassword(body, email);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)('/:email'),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PasswordresetController.prototype, "sendCode", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)(1, 1200),
    (0, common_1.Post)('/:email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("email")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_dto_1.ResetDto, String, Object]),
    __metadata("design:returntype", Promise)
], PasswordresetController.prototype, "updatePassword", null);
PasswordresetController = __decorate([
    (0, common_1.Controller)('api/passwordreset'),
    __metadata("design:paramtypes", [passwordreset_service_1.PasswordresetService])
], PasswordresetController);
exports.PasswordresetController = PasswordresetController;
//# sourceMappingURL=passwordreset.controller.js.map