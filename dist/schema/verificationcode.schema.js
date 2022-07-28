"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.VerificationCodeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    exp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
//# sourceMappingURL=verificationcode.schema.js.map