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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const middleware_service_1 = require("../middlewares/middleware.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PostService = class PostService {
    constructor(userModel, postModel, commentModel, postMediaModel, subscriptionModel, likeModel, cacheManager, middlewareService, cloudinaryService) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.postMediaModel = postMediaModel;
        this.subscriptionModel = subscriptionModel;
        this.likeModel = likeModel;
        this.cacheManager = cacheManager;
        this.middlewareService = middlewareService;
        this.cloudinaryService = cloudinaryService;
    }
    async getPosts(userid, mode) {
        try {
            const posts = await this.postModel.find({ user: userid, mode }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { 'userName': 1, 'email_verified': 1, 'profilePicture': 1 }
                },
                {
                    path: "medias",
                    model: "PostMedia",
                },
            ]).sort({
                createdAt: 'descending'
            });
            return posts;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPrivatePost(userid, mode) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const posts = await this.getPosts(userid, mode);
            if (posts.length < 1)
                return {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                };
            return {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: posts
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async newPost(userid, post) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const response = await this.cloudinaryService.uploadAsset(post.assets, process.env.POST);
            const { data, type } = response;
            if (type === "success") {
                let savePost = new this.postModel({
                    user: userid,
                    caption: post.caption,
                });
                const mediaIds = [];
                for (const media of data) {
                    let saveMedia = new this.postMediaModel(Object.assign(Object.assign({}, media), { post: savePost._id }));
                    if (media.format === "video")
                        savePost.mode = "video";
                    if (media.format === "image")
                        savePost.mode = "image";
                    await saveMedia.save();
                    savePost.medias = [...savePost.medias, saveMedia._id];
                }
                await savePost.save();
                return {
                    message: 'post successfully uploaded',
                    status: 200,
                    isSuccess: true
                };
            }
            if (type === 'error') {
                return {
                    message: data,
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
    async deletePost(postid, userid) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const post = await this.postModel.findOne({ _id: postid, user: userid });
            if (!post)
                return {
                    message: "post not found",
                    status: 400,
                    isSuccess: false
                };
            await this.postModel.deleteOne({ _id: postid });
            return {
                message: "post deleted",
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
    async likePost(postid, userid) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            let post = await this.postModel.findOne({ _id: postid });
            if (!post)
                return {
                    message: "post not found",
                    status: 400,
                    isSuccess: false
                };
            const check = await this.likeModel.findOne({ user: userid, post: postid });
            if (check)
                return {
                    message: "post already liked by you",
                    status: 400,
                    isSuccess: false
                };
            let like = new this.likeModel({
                post: postid,
                username: user.userName,
                user: userid
            });
            like = await like.save();
            post.likes.push(like._id);
            await post.save();
            return {
                message: "post liked",
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
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Post')),
    __param(2, (0, mongoose_1.InjectModel)('Comment')),
    __param(3, (0, mongoose_1.InjectModel)('PostMedia')),
    __param(4, (0, mongoose_1.InjectModel)('Subscription')),
    __param(5, (0, mongoose_1.InjectModel)('Like')),
    __param(6, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object, middleware_service_1.MiddleWareService,
        cloudinary_service_1.CloudinaryService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map