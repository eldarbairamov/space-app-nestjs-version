import { axiosInstance, AxiosRes } from "./axios.service";
import { plansRequests } from "../config/config";
import { IPlan } from "../interface";

export const planService = {

   updatePlan: async (planId: IPlan["id"], title: string): AxiosRes<void> => {
      return axiosInstance.put(plansRequests.updatePlan + planId, { title });
   },


};