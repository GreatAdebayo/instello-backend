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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const middleware_service_1 = require("../middlewares/middleware.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FeedService = class FeedService {
    constructor(postModel, commentModel, followModel, middlewareService) {
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.followModel = followModel;
        this.middlewareService = middlewareService;
    }
    async fetchFeeds(userid) {
        try {
            const personal = await this.postModel.find({ userid, type: "timeline" });
            const [followings, followers] = await Promise.all([this.followModel.find({ "follower.id": userid }).select("following"),
                this.followModel.find({ "following.id": userid }).select("follower")]);
            const followersIds = [];
            const followindIds = [];
            if (followings.length > 0 && followers.length > 0) {
                ((callback) => {
                    followers.forEach((follower, followerindex) => {
                        followersIds.push(follower.follower.id);
                        if (followerindex == followers.length - 1) {
                        }
                    });
                })((a, b) => {
                    console.log(a);
                    console.log(b);
                });
            }
            else {
                return {
                    message: "timeline fetched",
                    status: 200,
                    isSuccess: true,
                    data: personal
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async feeds(userid) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user)
                return {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const feeds = await this.fetchFeeds(userid);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(1, (0, mongoose_1.InjectModel)('Comment')),
    __param(2, (0, mongoose_1.InjectModel)('Follow')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        middleware_service_1.MiddleWareService])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map