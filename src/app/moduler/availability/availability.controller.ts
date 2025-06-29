import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { AppointmentStatus, availabilityService } from "./availability.service";

const createAvailability = catchAsync(async (req, res) => {
  const body = req.body;
  const doctorId = req.user?.userID;
  const data = await availabilityService.createAvailability(body, doctorId);

  sendResponse(res, {
    success: true,
    message: "Slots added is Success",
    statusCode: 201,
    data: data,
  });
});
const getDoctorAppointments = catchAsync(async (req, res) => {
  const doctorId = req.user?.userID;
  const statusQuery = req.query.status as string;

  const allowedStatuses: AppointmentStatus[] = [
    "pending",
    "accepted",
    "cancelled",
    "completed",
  ];

  const status: AppointmentStatus = allowedStatuses.includes(
    statusQuery as AppointmentStatus
  )
    ? (statusQuery as AppointmentStatus)
    : "pending";

  const data = await availabilityService.getDoctorAppointments(
    doctorId,
    status
  );

  sendResponse(res, {
    success: true,
    message: "Retrieved all doctor appointments",
    statusCode: 200,
    data: data,
  });
});
const updatedDoctorAppointments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const data = await availabilityService.updatedDoctorAppointments(id, status);

  sendResponse(res, {
    success: true,
    message: "Update Appoinment is  Success",
    statusCode: 200,
    data: data,
  });
});
export const availabilityContoller = {
  createAvailability,
  getDoctorAppointments,
  updatedDoctorAppointments,
};
