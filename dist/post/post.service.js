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
    constructor(userModel, postModel, commentModel, cacheManager) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.cacheManager = cacheManager;
    }
    async getPost(userid) {
        let response;
        try {
            const user = await this.userModel.findById(userid);
            if (!user)
                return response = {
                    message: "user not found",
                    status: 400,
                    isSuccess: false
                };
            const cachedItem = await this.cacheManager.get("user_post");
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
            });
            await this.cacheManager.set("user_post", posts);
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
    async createPost() { }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Post')),
    __param(2, (0, mongoose_1.InjectModel)('Comment')),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map