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
let PostService = class PostService {
    constructor(userModel, postModel, commentModel, subscriptionModel, cacheManager) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.subscriptionModel = subscriptionModel;
        this.cacheManager = cacheManager;
    }
    async getPrivatePost({ userid, limit }) {
        let response;
        try {
            const user = await this.userModel.findById(userid);
            if (!user)
                return response = {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const cachedItem = await this.cacheManager.get("private_user_post");
            if (cachedItem)
                return response = {
                    message: "posts succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: cachedItem
                };
            const posts = await this.postModel.find({ user: userid }).populate({
                path: "comment",
                model: "Comment",
                options: {
                    limit: limit || 8
                }
            }).limit(limit || 8);
            if (posts.length < 1)
                return response = {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                };
            await this.cacheManager.set("private_user_post", posts);
            return response = {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: posts
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async getPosts({ userid, limit }) {
        try {
            const posts = await this.postModel.find({ user: userid }).populate({
                path: "comment",
                model: "Comment",
                options: {
                    limit: limit || 8
                }
            }).limit(limit || 8);
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
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async checkSubscriptionStatus({ userid, userNameId, limit }) {
        const isSubscribed = await this.subscriptionModel.findOne({ subscriber: userid, user: userNameId });
        if (!isSubscribed)
            return {
                message: `you are not in the subscription list`,
                status: 400,
                isSuccess: false
            };
        return await this.getPosts({ userid, limit });
    }
    async getPublicPost({ userid, username, limit }) {
        let response;
        try {
            const user = await this.userModel.findById(userid);
            if (!user)
                return response = {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const userName = await this.userModel.findOne({ userName: username });
            if (!userName)
                return response = {
                    message: "username not found",
                    status: 400,
                    isSuccess: false
                };
            if (userName.subscription.mode) {
                return await this.checkSubscriptionStatus({ userid, userNameId: userName._id, limit: limit });
            }
            else {
                return await this.getPosts({ userid, limit });
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException('something is wrong!');
        }
    }
    async uploadPost() {
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Post')),
    __param(2, (0, mongoose_1.InjectModel)('Comment')),
    __param(3, (0, mongoose_1.InjectModel)('Subscription')),
    __param(4, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map