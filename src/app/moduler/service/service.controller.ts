import { doctorService } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const body = req.body;
  const doctorId = req.user.userID;
  const data = await doctorService.createService();

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: data,
  });
});
const doctorRegister = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await doctorService.doctorRegisterService(body);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: data,
  });
});
const doctorRegister = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await doctorService.doctorRegisterService(body);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: data,
  });
});
const doctorRegister = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await doctorService.doctorRegisterService(body);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: data,
  });
});
const doctorRegister = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await doctorService.doctorRegisterService(body);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: 201,
    data: data,
  });
});
export const doctorController = {
  doctorRegister,
};
