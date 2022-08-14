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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const passport_1 = require("@nestjs/passport");
const post_dto_1 = require("./dto/post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getPrivatePost(req, res, limit = 8) {
        const response = await this.postService.getPrivatePost({ userid: req.user.id, limit: 8 });
        return res.status(response.status).json(response);
    }
    async getPublicPost(req, username, res) {
        const response = await this.postService.getPublicPost({ userid: req.user.id, username, limit: 8 });
        return res.status(response.status).json(response);
    }
    async uploadPost(body, file, req, res) {
        const response = await this.postService.uploadPost(req.user.id, body, file);
        return res.status(response.status).json(response);
    }
    async deletePost(postid, req, res) {
        const response = await this.postService.deletePost(postid, req.user.id);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('private'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPrivatePost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('public/:username'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("username")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPublicPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, common_1.Controller)('api/post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map