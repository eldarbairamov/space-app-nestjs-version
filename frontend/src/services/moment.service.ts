import { axiosInstance, AxiosRes } from "./axios.service";
import { momentsRequests } from "../config/config";
import { IMoment, IMoments } from "../interface";

export const momentService = {

   addMoment: async () => {
      return axiosInstance.get<IMoment>(momentsRequests.addMoment);
   },

   getMoments: async (searchKey: string) => {
      return axiosInstance.get<IMoments>(momentsRequests.getAllMoments, { params: { searchKey: searchKey || null } });
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

   getMomentsCount: async (): AxiosRes<number> => {
      return axiosInstance.get(momentsRequests.getMomentsCount);
   },

};