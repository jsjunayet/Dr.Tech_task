"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityModel = void 0;
const mongoose_1 = require("mongoose");
const availabilitySchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: true },
    day: { type: String, required: true },
    timeSlots: [{ type: String, required: true }],
}, { timestamps: true });
exports.AvailabilityModel = (0, mongoose_1.model)("Availability", availabilitySchema);
