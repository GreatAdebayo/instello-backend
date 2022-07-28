"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollwersSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.FollwersSchema = new Schema({
    profilePicture: {
        type: String
    },
    userName: {
        type: String,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=followers.schema.js.map