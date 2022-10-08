"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWareModule = void 0;
const common_1 = require("@nestjs/common");
const middleware_service_1 = require("./middleware.service");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schema/user.schema");
const subscription_schema_1 = require("../../schema/subscription.schema");
let MiddleWareModule = class MiddleWareModule {
};
MiddleWareModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule, mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Subscription', schema: subscription_schema_1.SubscriptionSchema },
            ])],
        providers: [middleware_service_1.MiddleWareService],
        controllers: [],
        exports: [middleware_service_1.MiddleWareService]
    })
], MiddleWareModule);
exports.MiddleWareModule = MiddleWareModule;
//# sourceMappingURL=middleware.module.js.map