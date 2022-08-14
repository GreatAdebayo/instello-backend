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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, followModel, postModel, cacheManager) {
        this.userModel = userModel;
        this.followModel = followModel;
        this.postModel = postModel;
        this.cacheManager = cacheManager;
    }
    async fetchDetails(userid, user) {
        try {
            const [followers, following, posts] = await Promise.all([this.followModel.find({ "following.id": userid }).select("-following"),
                this.followModel.find({ "follower.id": userid }).select("-follower"), this.postModel.find({ user: userid }), this.cacheManager.set("private_user_info", user)]);
            return {
                followers, following, posts
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async privateUserInfo(userid) {
        try {
            const [user, cachedItem] = await Promise.all([this.userModel.findById(userid).select(`-password -createdAt -updatedAt 
            -ip -device_verified`), this.cacheManager.get("private_user_info")]);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            if (cachedItem)
                return {
                    message: "user info succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: cachedItem
                };
            const { followers, posts, following } = await this.fetchDetails(userid, user);
            user.followers = followers;
            user.following = following;
            user.noOfposts = posts.length;
            return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async publicUserInfo(username) {
        try {
            const [user, cachedItem] = await Promise.all([this.userModel.findOne({ userName: username }).select(`-password -createdAt -updatedAt 
             -ip -device_verified`), this.cacheManager.get("private_user_info")]);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            if (cachedItem)
                return {
                    message: "user info succefully fetched",
                    status: 200,
                    isSuccess: true,
                    data: cachedItem
                };
            const { followers, posts, following } = await this.fetchDetails(user._id, user);
            user.followers = followers;
            user.following = following;
            user.noOfposts = posts.length;
            return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async searchUser({ page, limit, username }) {
        try {
            const users = await this.userModel.find({ "userName": { $regex: '.*' + username + '.*', $options: 'i' } })
                .limit(limit || 5)
                .skip((page - 1) * limit || 0)
                .sort("asc").select(`-firstName -lastName -password -createdAt -updatedAt 
        -ip -device_verified -following -followers -email -email_verified`);
            if (users.length < 1)
                return {
                    message: "no user found",
                    status: 400,
                    isSuccess: false
                };
            return {
                message: "users succefully fetched",
                status: 200,
                isSuccess: true,
                data: users
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
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Follow')),
    __param(2, (0, mongoose_1.InjectModel)('Post')),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map