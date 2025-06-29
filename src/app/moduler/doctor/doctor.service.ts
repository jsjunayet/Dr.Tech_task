import { AppointmentModel } from "../appointment/appointment.model";
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

const getDoctorProfile = async (doctorId: string) => {
  const doctor = await DoctorModel.findById(doctorId)
    .select("name hospitalName hospitalFloor services availability")
    .populate("services")
    .populate("availability");

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  const acceptedAppointments = await AppointmentModel.find({
    doctorId,
    status: "accepted",
  });
  const remainingSlotsPerService = doctor.services.map((service: any) => {
    const serviceAvailability = doctor.availability.filter(
      (a: any) =>
        a?.serviceId && a.serviceId.toString() === service._id.toString()
    );

    const remainingSlots = serviceAvailability.map((slot: any) => {
      const bookedSlots = acceptedAppointments.filter(
        (appt) =>
          appt.serviceId.toString() === service._id.toString() &&
          appt.selectedDate.toISOString().slice(0, 10) === slot.day &&
          appt.timeSlot === slot.timeSlot
      );

      return {
        day: slot.day,
        timeSlot: slot.timeSlot,
        remaining: 1 - bookedSlots.length,
      };
    });

    return {
      serviceId: service._id,
      title: service.title,
      remainingSlots,
    };
  });

  const result = {
    doctor: {
      name: doctor.name,
      hospitalName: doctor.hospitalName,
      hospitalFloor: doctor.hospitalFloor,
    },
    services: doctor.services,
    availability: doctor.availability,
    remainingSlotsPerService,
  };
  return result;
};
export const doctorService = {
  GetallDoctor,
  getDoctorProfile,
};
