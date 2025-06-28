import { Schema, model } from "mongoose";
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
  },
  {
    timestamps: true,
  }
);
patientSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingUser = await PatientModel.findOne({ email: this.email });
    if (existingUser) {
      throw new AppErrors(409, "This user is already registered");
    }
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export const PatientModel = model<IPatient>("Patient", patientSchema);
