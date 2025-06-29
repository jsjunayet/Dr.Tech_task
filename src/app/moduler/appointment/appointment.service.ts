import AppErrors from "../../error/AppErrors";
import { IAppointment } from "./appointment.interface";
import { AppointmentModel } from "./appointment.model";

const createAppointment = async (payload: IAppointment, patientId: string) => {
  const { doctorId, serviceId, selectedDate, timeSlot } = payload;
  const exists = await AppointmentModel.findOne({
    doctorId,
    serviceId,
    selectedDate: new Date(selectedDate),
    timeSlot,
    status: { $in: ["accepted"] },
  });

  if (exists) {
    throw new AppErrors(400, "Slot already booked");
  }

  const appointment = await AppointmentModel.create({
    doctorId,
    serviceId,
    patientId,
    selectedDate: new Date(selectedDate),
    timeSlot,
    status: "pending",
  });

  return appointment;
};

const GetPatientAppointment = async (patientId: string) => {
  const result = await AppointmentModel.find({ patientId }).populate(
    "doctorId",
    "-password"
  );

  return result;
};
export const appoinmentService = {
  createAppointment,
  GetPatientAppointment,
};
