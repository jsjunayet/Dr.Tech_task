import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { doctorService } from "./doctor.service";

const getAllDoctor = catchAsync(async (req, res) => {
  const SearchTerm = req.query;
  const data = await doctorService.GetallDoctor(SearchTerm);

  sendResponse(res, {
    success: true,
    message: "Retrieved All Doctor successfully",
    statusCode: 201,
    data: data,
  });
});
export const doctorController = {
  getAllDoctor,
};
