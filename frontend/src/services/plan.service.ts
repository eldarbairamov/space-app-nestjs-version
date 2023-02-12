import { axiosInstance, AxiosRes } from "./axios.service";
import { plansRequests } from "../config/config";
import { IPlan, IPlans } from "../interface";

export const planService = {

   addPlan: async () => {
      return axiosInstance.get<IPlan>(plansRequests.addPlan);
   },

   deletePlan: async (planId: IPlan["id"]): AxiosRes<void> => {
      return axiosInstance.delete(plansRequests.deletePlan + planId);
   },

   updatePlan: async (planId: IPlan["id"], title: string): AxiosRes<void> => {
      return axiosInstance.put(plansRequests.updatePlan + planId, { title });
   },

   getPlans: async (searchKey: string) => {
      return axiosInstance.get<IPlans>(plansRequests.getAllPlans, { params: { searchKey: searchKey || null } });
   },

   getPlansCount: async () => {
      return axiosInstance.get<number>(plansRequests.getPlansCount);
   },

};