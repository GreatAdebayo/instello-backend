"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String
    },
    access: {
        type: String,
        required: true
    },
    media: [
        {
            url: String,
            cloudinary_id: String,
        },
    ],
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like",
        },
    ],
}, { timestamps: true });
//# sourceMappingURL=post.schema.js.map