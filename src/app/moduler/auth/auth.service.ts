import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppErrors from "../../error/AppErrors";
import { IDoctor } from "../doctor/doctor.interface";
import { DoctorModel } from "../doctor/doctor.model";
import { PatientModel } from "../patient/patient.model";

const doctorRegisterService = async (payload: IDoctor) => {
  const result = await DoctorModel.create(payload);
  return {
    name: result.name,
    email: result.email,
  };
};

const patientRegisterService = async (payload: IDoctor) => {
  const result = await DoctorModel.create(payload);
  return {
    name: result.name,
    email: result.email,
  };
};

const authLoginService = async (email: string, password: string) => {
  let user = await DoctorModel.findOne({ email });

  let role = "doctor";
  if (!user) {
    user = await PatientModel.findOne({ email });
    role = "patient";
  }

  if (!user) {
    throw new AppErrors(404, "User is Not Found");
  }

  const matchPassword = await bcrypt.compare(password, user?.password);
  if (!matchPassword) {
    throw new AppErrors(409, "Invalid credentials");
  }

  const accessToken = jwt.sign(
    { userID: user?._id, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { accessToken, role, user };
};

export const AllAuthService = {
  authLoginService,
  doctorRegisterService,
  patientRegisterService,
};
