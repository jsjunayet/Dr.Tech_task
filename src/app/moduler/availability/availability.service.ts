import { DoctorModel } from "../doctor/doctor.model";
import { IAvailability } from "./availability.interface";
import { AvailabilityModel } from "./availability.model";

const createAvailability = async (payload: IAvailability, doctorId: string) => {
  const { day, timeSlots, service } = payload;

  const availability = await AvailabilityModel.create({
    doctor: doctorId,
    service,
    day,
    timeSlots,
  });

  await DoctorModel.findByIdAndUpdate(doctorId, {
    $push: { availability: availability._id },
  });

  return availability;
};
export const availabilityService = {
  createAvailability,
};
