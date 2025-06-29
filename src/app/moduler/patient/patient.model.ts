import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import AppErrors from "../../error/AppErrors";
import { DoctorModel } from "../doctor/doctor.model";
import { IPatient } from "./patient.interface";

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    role: { type: String, default: "patient" },
  },
  {
    timestamps: true,
  }
);
patientSchema.pre("save", async function (next) {
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

export const PatientModel = model<IPatient>("Patient", patientSchema);
