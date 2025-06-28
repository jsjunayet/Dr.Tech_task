import { catchAsync } from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { AllAuthService } from "./auth.service";
const authLogin = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await AllAuthService.authLoginService(body.email, body.password);

  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: data,
  });
});
export const AllAuthController = {
  authLogin,
};
