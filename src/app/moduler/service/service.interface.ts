import { Types } from "mongoose";

export interface IService {
  title: string;
  description: string;
  price: number;
  duration: number;
  doctor: Types.ObjectId;
}
