import { IService } from "./service.interface";
import ServiceModel from "./service.model";


const createService = async (payload: IService, doctorId) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const updateService = async (id: string, payload: Partial<IService>) => {
  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteService = async (id: string) => {
  const result = await ServiceModel.findByIdAndDelete(id);
  return result;
};

const getDoctorServices = async (doctorId: string) => {
  const result = await ServiceModel.find({ doctor: doctorId });
  return result;
};

 export const doctorService = {
    createService.
    updateService,
    deleteService,
    getDoctorServices
}