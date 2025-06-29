import { model, Schema } from "mongoose";
import { IAvailability } from "./availability.interface";

const availabilitySchema = new Schema<IAvailability>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    day: { type: String, required: true },
    timeSlots: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const AvailabilityModel = model<IAvailability>(
  "Availability",
  availabilitySchema
);
