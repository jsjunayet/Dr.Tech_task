"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true },
}, { timestamps: true });
const ServiceModel = (0, mongoose_1.model)("Service", serviceSchema);
exports.default = ServiceModel;
