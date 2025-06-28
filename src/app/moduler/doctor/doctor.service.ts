import { IDoctor } from "./doctor.interface";
import { DoctorModel } from "./doctor.model";

const doctorRegisterService = async (body: IDoctor) => {
  const result = await DoctorModel.create(body);

  return {
    name: result.name,
    email: result.email,
  };
};
export const doctorService = {
  doctorRegisterService,
};
