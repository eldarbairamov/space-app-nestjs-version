import { axiosInstance, AxiosRes } from "./axios.service";
import { momentsRequests } from "../config/config";
import { IMoment } from "../interface";

export const momentService = {

   deleteMoment: async (momentId: IMoment["id"]): AxiosRes<void> => {
      return axiosInstance.delete(momentsRequests.deleteMoment + momentId);
   },

};