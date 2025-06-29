// models/doctor.model.ts
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import AppErrors from "../../error/AppErrors";
import { PatientModel } from "../patient/patient.model";
import { IDoctor } from "./doctor.interface";

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    hospitalName: { type: String, required: true },
    hospitalFloor: { type: String, required: true },
    role: { type: String, default: "doctor" },
    profileImage: { type: String, default: "" },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    availability: [{ type: Schema.Types.ObjectId, ref: "Availability" }],
  },
  {
    timestamps: true,
  }
);
doctorSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingDoctor = await DoctorModel.findOne({ email: this.email });
    if (existingDoctor) {
      throw new AppErrors(409, "This Doctor is already registered");
    }
    const existingPatient = await PatientModel.findOne({ email: this.email });
    if (existingPatient) {
      throw new AppErrors(409, "This Patient is already registered");
    }
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});
export const DoctorModel = model<IDoctor>("Doctor", doctorSchema);
