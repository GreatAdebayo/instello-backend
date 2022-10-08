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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./dto/comment.dto");
const mongoose_1 = require("mongoose");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async postComment(body, postid, req, res) {
        const response = await this.commentService.postComment(body, postid, req.user.id);
        return res.status(response.status).json(response);
    }
    async deletePost({ comid, postid }, req, res) {
        const response = await this.commentService.deleteComment(comid, postid, req.user.id);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto, mongoose_1.Types.ObjectId, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "postComment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('/:comid/:postid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deletePost", null);
CommentController = __decorate([
    (0, common_1.Controller)('api/comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map