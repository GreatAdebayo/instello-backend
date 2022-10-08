"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=like.schema.js.map