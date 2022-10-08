"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=comment.schema.js.map