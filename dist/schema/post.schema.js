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
    media: {
        url: {
            type: String,
            required: true,
        },
        cloudinary_id: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        }
    },
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
    ]
}, { timestamps: true });
//# sourceMappingURL=post.schema.js.map