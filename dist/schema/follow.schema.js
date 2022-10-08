"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.FollowSchema = new Schema({
    following: {
        id: {
            type: Schema.Types.ObjectId
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String,
            required: true,
        }
    },
    follower: {
        id: {
            type: Schema.Types.ObjectId
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String,
            required: true,
        }
    },
}, { timestamps: true });
//# sourceMappingURL=follow.schema.js.map