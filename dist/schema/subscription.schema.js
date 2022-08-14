"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.SubscriptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subscriber: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    }
}, { timestamps: true });
//# sourceMappingURL=subscription.schema.js.map