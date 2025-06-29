import { DoctorModel } from "./doctor.model";

const GetallDoctor = async (SearchTerm) => {
  const { hospitalName, specialization, serviceName } = SearchTerm;
  const filter: any = {};
  if (hospitalName)
    filter.hospitalName = { $regex: hospitalName, $options: "i" };
  if (specialization)
    filter.specialization = { $regex: specialization, $options: "i" };

  let doctors = await DoctorModel.find(filter)
    .populate({
      path: "services",
      match: serviceName
        ? { title: { $regex: serviceName, $options: "i" } }
        : {},
    })
    .populate("availability");

  if (serviceName) {
    doctors = doctors.filter((doc) => doc.services.length > 0);
  }
  return doctors;
};
export const doctorService = {
  GetallDoctor,
};
