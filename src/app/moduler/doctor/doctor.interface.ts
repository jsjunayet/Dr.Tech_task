import { Document, Types } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
  profileImage?: string;
  services?: Types.ObjectId[];
  availability?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
