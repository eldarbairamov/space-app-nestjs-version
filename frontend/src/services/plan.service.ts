import { type AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";
import { plansRequests } from "../config/config";
import { PlanDto } from "../dto/intex";

export const planService = {

   addPlan: async () => axiosInstance.get<PlanDto>(plansRequests.addPlan),

   deletePlan: async (planId: string): Promise<AxiosResponse> => axiosInstance.delete(plansRequests.deletePlan + planId),

   updatePlan: async (planId: string, title: string): Promise<AxiosResponse> => {
      const planDto = { title };
      return axiosInstance.put(plansRequests.updatePlan + planId, planDto);
   },

   getAllPlans: async () => axiosInstance.get<PlanDto[]>(plansRequests.getAllPlans),

   getPlansCount: async () => axiosInstance.get<number>(plansRequests.getPlansCount),

   getPlansBySearch: async (searchKey: string) => axiosInstance.get<PlanDto[]>(plansRequests.getPlansBySearch, {
      params: { searchKey },
   }),

};