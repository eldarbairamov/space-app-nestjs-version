import { axiosInstance, AxiosRes } from "./axios.service";
import { momentsRequests } from "../config/config";
import { IMoment } from "../interface";

export const momentService = {

   addMoment: async () => {
      return axiosInstance.get<IMoment>(momentsRequests.addMoment);
   },

   getMoments: async () => {
      return axiosInstance.get<IMoment[]>(momentsRequests.getAllMoments);
   },

   getOneMoment: async (momentId: IMoment["id"]) => {
      return axiosInstance.get<IMoment>(momentsRequests.getOneMoment + momentId);
   },

   updateMoment: async (momentId: IMoment["id"], update: Partial<IMoment>): AxiosRes<void> => {
      return axiosInstance.patch(momentsRequests.updateMoment + momentId, update);
   },

   deleteMoment: async (momentId: IMoment["id"]): AxiosRes<void> => {
      return axiosInstance.delete(momentsRequests.deleteMoment + momentId);
   },

   updatePhoto: async (momentId: IMoment["id"], formData: FormData) => {
      const { data } = await axiosInstance.patch<{ image: string }>(momentsRequests.uploadPhoto + momentId + "/photo_upload", formData);
      return data.image;
   },

};