"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMediaSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.PostMediaSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
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
}, { timestamps: true });
//# sourceMappingURL=media.schema.js.map