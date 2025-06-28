// models/doctor.model.ts
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import AppErrors from "../../error/AppErrors";
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
  },
  {
    timestamps: true,
  }
);
doctorSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingUser = await DoctorModel.findOne({ email: this.email });
    if (existingUser) {
      throw new AppErrors(409, "This user is already registered");
    }
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});
export const DoctorModel = model<IDoctor>("Doctor", doctorSchema);
