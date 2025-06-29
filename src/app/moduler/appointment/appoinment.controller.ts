import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { appoinmentService } from "./appointment.service";

const createAppointment = catchAsync(async (req, res) => {
  const body = req.body;
  const patientId = req.user?.userID;
  const data = await appoinmentService.createAppointment(body, patientId);

  sendResponse(res, {
    success: true,
    message: "Appointment requested",
    statusCode: 201,
    data: data,
  });
});
const GetPatientAppointment = catchAsync(async (req, res) => {
  const patientId = req.user?.userID;
  const data = await appoinmentService.GetPatientAppointment(patientId);

  sendResponse(res, {
    success: true,
    message: "Patient Retrive all Appointment",
    statusCode: 200,
    data: data,
  });
});
export const AppointmentContoller = {
  createAppointment,
  GetPatientAppointment,
};
