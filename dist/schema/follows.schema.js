"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.FollowSchema = new Schema({
    profilePicture: {
        type: String
    },
    follower: {
        type: String,
        required: true
    },
    following: {
        type: String,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=follows.schema.js.map