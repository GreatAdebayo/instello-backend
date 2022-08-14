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
exports.MiddleWareService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const mongoose_2 = require("mongoose");
let MiddleWareService = class MiddleWareService {
    constructor(cloudinary, userModel) {
        this.cloudinary = cloudinary;
        this.userModel = userModel;
    }
    async fileValidationAndUploader(file, folder) {
        const supportedFormat = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
        try {
            const checkFormat = supportedFormat.find(format => format === file.mimetype);
            if (!checkFormat)
                return {
                    message: `file format not supported, supported formart(${supportedFormat})`,
                    type: "format"
                };
            if (file.size > 10000000)
                return {
                    message: `file size too large than 10mb`,
                    type: "size"
                };
            const upload = await this.cloudinary.uploadImage(file, folder);
            return {
                type: "upload",
                data: upload
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async checkUserExists(userid) {
        try {
            const user = await this.userModel.findById(userid).select(`-password -createdAt -updatedAt 
            -ip -device_verified`);
            if (!user)
                return;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
MiddleWareService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        mongoose_2.Model])
], MiddleWareService);
exports.MiddleWareService = MiddleWareService;
//# sourceMappingURL=middleware.service.js.map