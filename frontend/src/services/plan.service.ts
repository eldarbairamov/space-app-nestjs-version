import { type AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";
import { type IPlanDto } from "../interface";
import { plansRequests } from "../config/config";


export const planService = {

   addPlan: async () => axiosInstance.get<IPlanDto>(plansRequests.addPlan),

   deletePlan: async (planId: string): Promise<AxiosResponse> => axiosInstance.delete(plansRequests.deletePlan + planId),

   updatePlan: async (planId: string, title: string): Promise<AxiosResponse> => {
      const planDto = { title };
      return axiosInstance.put(plansRequests.updatePlan + planId, planDto);
   },

   getAllPlans: async () => axiosInstance.get<IPlanDto[]>(plansRequests.getAllPlans),

   getPlansCount: async () => axiosInstance.get<number>(plansRequests.getPlansCount),

   getPlansBySearch: async (searchKey: string) => axiosInstance.get<IPlanDto[]>(plansRequests.getPlansBySearch, {
      params: { searchKey },
   }),

};