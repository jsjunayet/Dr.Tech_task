import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppErrors from "../../error/AppErrors";
import { DoctorModel } from "../doctor/doctor.model";

const authLoginService = async (email: string, password: string) => {
  let user = await DoctorModel.findOne({ email });

  let role = "doctor";
  // if (!user) {
  //   user = await PatientModel.findOne({ email });
  //   role = "patient";
  // }

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
};
