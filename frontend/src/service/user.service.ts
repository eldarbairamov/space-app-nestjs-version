import { axiosInstance } from "./axios.service";
import { userRequests } from "../config/config";

export const userService = {

   deleteAvatar: async (fileName: string): Promise<void> => {
      return axiosInstance.patch(userRequests.deleteAvatar, { fileName });
   },

};