"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.LikeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    by: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=like.schema.js.map