import AppErrors from "../../error/AppErrors";
import { AppointmentModel } from "../appointment/appointment.model";
import { DoctorModel } from "../doctor/doctor.model";
import { IAvailability } from "./availability.interface";
import { AvailabilityModel } from "./availability.model";
export type AppointmentStatus =
  | "pending"
  | "accepted"
  | "cancelled"
  | "completed";

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

const getDoctorAppointments = async (
  doctorId: string,
  status: AppointmentStatus
) => {
  const appointments = await AppointmentModel.find({
    doctorId,
    status,
  })
    .populate("patientId", "name email phone")
    .populate("serviceId", "title price duration");
  return appointments;
};
const updatedDoctorAppointments = async (
  id: string,
  status: AppointmentStatus
) => {
  if (!["accepted", "cancelled", "completed"].includes(status)) {
    throw new AppErrors(400, "Invalid status value");
  }

  const appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    throw new AppErrors(400, "Appointment not found");
  }

  appointment.status = status;
  await appointment.save();

  return appointment;
};
export const availabilityService = {
  createAvailability,
  getDoctorAppointments,
};
