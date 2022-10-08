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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const middleware_service_1 = require("../middlewares/middleware.service");
let CommentService = class CommentService {
    constructor(commentModel, postModel, middlewareService) {
        this.commentModel = commentModel;
        this.postModel = postModel;
        this.middlewareService = middlewareService;
    }
    async postComment({ content }, postid, userid) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const post = await this.postModel.findOne({ _id: postid });
            if (!post)
                return {
                    message: "post not found",
                    status: 400,
                    isSuccess: false
                };
            let postComment = new this.commentModel({
                username: user.userName,
                content,
                post: postid
            });
            postComment = await postComment.save();
            post.comments.push(postComment._id);
            await post.save();
            return {
                message: "comment posted",
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
    async deleteComment(comid, postid, userid) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const post = await this.commentModel.findOne({ _id: comid, user: userid, post: postid });
            if (!post)
                return {
                    message: "comment not found",
                    status: 400,
                    isSuccess: false
                };
            await this.commentModel.deleteOne({ _id: comid });
            await this.postModel.findByIdAndUpdate({ _id: postid }, {
                $pull: {
                    comments: comid,
                },
            });
            return {
                message: "comment deleted",
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
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Comment')),
    __param(1, (0, mongoose_1.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        middleware_service_1.MiddleWareService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map