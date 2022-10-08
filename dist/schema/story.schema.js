"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorySchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.StorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: "StoryView",
        },
    ]
}, { timestamps: true });
//# sourceMappingURL=story.schema.js.map