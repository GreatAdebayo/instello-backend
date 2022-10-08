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
    async getPosts(userid, { limit, type }) {
        try {
            const posts = await this.postModel.find({ user: userid, type }).populate([
                {
                    path: "comments",
                    model: "Comment",
                    options: {
                        limit: limit || 8
                    }
                },
                {
                    path: "likes",
                    model: "Like"
                }
            ]).limit(limit || 8);
            return posts;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPrivatePost(userid, { limit, type }) {
        try {
            const [user, cachedItem] = await Promise.all([this.middlewareService.checkUserExists(userid), this.cacheManager.get("private_user_post")]);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            if (cachedItem)
                return {
                    message: "posts succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: cachedItem
                };
            const posts = await this.getPosts(userid, { limit, type });
            if (posts.length < 1)
                return {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                };
            await this.cacheManager.set("private_user_post", posts);
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
    async getPublicPost(userid, username, { limit, type }) {
        try {
            const [user, userName] = await Promise.all([this.middlewareService.checkUserExists(userid), this.userModel.findOne({ userName: username })]);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            if (!userName)
                return {
                    message: "username not found",
                    status: 400,
                    isSuccess: false
                };
            if (await this.middlewareService.checkSubscription({ userid, userNameId: userName._id })) {
                const [posts, cachedItem] = await Promise.all([this.getPosts(userid, { limit, type }), this.cacheManager.get("public_user_post")]);
                if (posts.length < 1)
                    return {
                        message: "no post yet",
                        status: 200,
                        isSuccess: false
                    };
                if (cachedItem)
                    return {
                        message: "posts succefully fetched",
                        status: 200,
                        isSuccess: true,
                        data: cachedItem
                    };
                await this.cacheManager.set("public_user_post", posts);
                return {
                    message: "posts succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: posts
                };
            }
            else {
                return {
                    message: "you are not in the subscription list",
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
    async getPublicTimeLine(userid, username, { limit, type }) {
        try {
            const [user, userName] = await Promise.all([this.middlewareService.checkUserExists(userid), this.userModel.findOne({ userName: username })]);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            if (!userName)
                return {
                    message: "username not found",
                    status: 400,
                    isSuccess: false
                };
            const [posts, cachedItem] = await Promise.all([this.getPosts(userid, { limit, type }), this.cacheManager.get("public_timeline")]);
            if (posts.length < 1)
                return {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                };
            if (cachedItem)
                return {
                    message: "posts succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: cachedItem
                };
            await this.cacheManager.set("public_timeline", posts);
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
                    type: post.type
                });
                const mediaIds = [];
                for (const media of data) {
                    let saveMedia = new this.postMediaModel(Object.assign(Object.assign({}, media), { post: savePost._id }));
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