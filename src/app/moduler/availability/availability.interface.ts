import { Types } from "mongoose";

export interface IAvailability {
  doctor: Types.ObjectId;
  service: Types.ObjectId;
  day: string;
  timeSlots: string[];
}
