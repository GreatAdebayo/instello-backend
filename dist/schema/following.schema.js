"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollwingSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.FollwingSchema = new Schema({
    profilePicture: {
        type: String
    },
    userName: {
        type: String,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=following.schema.js.map