import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { doctorService } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const body = req.body;
  const doctorId = req?.user?.userID;
  const data = await doctorService.createService(body, doctorId);

  sendResponse(res, {
    success: true,
    message: "Service successfully Created",
    statusCode: 201,
    data: data,
  });
});
const UpdateService = catchAsync(async (req, res) => {
  const body = req.body;
  const doctorId = req?.user?.userID;
  const data = await doctorService.updateService(req.params.id, doctorId, body);
  sendResponse(res, {
    success: true,
    message: "Service successfully Updated",
    statusCode: 200,
    data: data,
  });
});
const deletedService = catchAsync(async (req, res) => {
  const doctorId = req?.user?.userID;
  const data = await doctorService.deleteService(req.params.id, doctorId);

  sendResponse(res, {
    success: true,
    message: "Service successfully Deleted",
    statusCode: 200,
    data: data,
  });
});
const getDoctorService = catchAsync(async (req, res) => {
  const doctorId = req?.user?.userID;
  const data = await doctorService.getDoctorServices(doctorId);
  sendResponse(res, {
    success: true,
    message: "Service successfully Retrieve",
    statusCode: 200,
    data: data,
  });
});

export const serviceController = {
  createService,
  UpdateService,
  deletedService,
  getDoctorService,
};
