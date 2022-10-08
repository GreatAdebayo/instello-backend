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
    medias: [
        {
            type: Schema.Types.ObjectId,
            ref: "Media"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like",
        },
    ],
    type: {
        type: String,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=post.schema.js.map