import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { availabilityService } from "./availability.service";

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
export const availabilityContoller = {
  createAvailability,
};
