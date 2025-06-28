import { Schema } from "mongoose";

export type TErrorSource = {
  path: string | number;
  message: string;
}[];
export type TGenericError = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
export type JWTuser = {
  userID: Schema.Types.ObjectId;
  role: string;
};
