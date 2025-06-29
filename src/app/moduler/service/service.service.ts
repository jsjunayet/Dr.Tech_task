import mongoose from "mongoose";
import { DoctorModel } from "../doctor/doctor.model";
import { IService } from "./service.interface";
import ServiceModel from "./service.model";

const createService = async (serviceData: IService, doctorId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const service = new ServiceModel({
      ...serviceData,
      doctor: doctorId,
    });

    await service.save({ session });

    await DoctorModel.findByIdAndUpdate(
      doctorId,
      { $push: { services: service._id } },
      { session }
    );

    await session.commitTransaction();
    return service;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateService = async (
  serviceId: string,
  doctorId: string,
  updateData: any
) => {
  const result = ServiceModel.findOneAndUpdate(
    { _id: serviceId, doctor: doctorId },
    updateData,
    { new: true }
  );
  return result;
};

const deleteService = async (serviceId: string, doctorId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const service = await ServiceModel.findOneAndDelete(
      { _id: serviceId, doctor: doctorId },
      { session }
    );

    if (!service) {
      throw new Error("Service not found or not authorized");
    }

    await DoctorModel.findByIdAndUpdate(
      doctorId,
      { $pull: { services: service._id } },
      { session }
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getDoctorServices = async (doctorId: string) => {
  const result = await ServiceModel.find({ doctor: doctorId });
  return result;
};

export const doctorService = {
  createService,
  updateService,
  deleteService,
  getDoctorServices,
};
