"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const middleware_module_1 = require("../middlewares/middleware.module");
const feed_service_1 = require("./feed.service");
const post_schema_1 = require("../../schema/post.schema");
const comment_schema_1 = require("../../schema/comment.schema");
const like_schema_1 = require("../../schema/like.schema");
const mongoose_1 = require("@nestjs/mongoose");
const follow_schema_1 = require("../../schema/follow.schema");
const feed_controller_1 = require("./feed.controller");
let FeedModule = class FeedModule {
};
FeedModule = __decorate([
    (0, common_1.Module)({
        providers: [feed_service_1.FeedService],
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'Post', schema: post_schema_1.PostSchema },
                { name: 'Comment', schema: comment_schema_1.CommentSchema },
                { name: 'Like', schema: like_schema_1.LikeSchema },
                { name: 'Follow', schema: follow_schema_1.FollowSchema },
            ]), middleware_module_1.MiddleWareModule],
        controllers: [feed_controller_1.FeedController]
    })
], FeedModule);
exports.FeedModule = FeedModule;
//# sourceMappingURL=feed.module.js.map