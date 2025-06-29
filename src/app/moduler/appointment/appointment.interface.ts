import { Types } from "mongoose";

export interface IAppointment {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  serviceId: Types.ObjectId;
  selectedDate: Date;
  timeSlot: string;
  status: "pending" | "accepted" | "cancelled" | "completed";
}
