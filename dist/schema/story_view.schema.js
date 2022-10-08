"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryViewSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.StoryViewSchema = new Schema({
    story: {
        type: Schema.Types.ObjectId,
        ref: "Story",
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=story_view.schema.js.map