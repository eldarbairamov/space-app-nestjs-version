import { type AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";
import { plansRequests } from "../config/config";
import { GetPlanDto } from "../dto";

export const planService = {

   addPlan: async () => {
      return axiosInstance.get<GetPlanDto>(plansRequests.addPlan);
   },

   deletePlan: async (planId: string): Promise<AxiosResponse> => {
      return axiosInstance.delete(plansRequests.deletePlan + planId);
   },

   updatePlan: async (planId: string, title: string): Promise<AxiosResponse> => {
      return axiosInstance.put(plansRequests.updatePlan + planId, { title });
   },

   getAllPlans: async () => {
      return axiosInstance.get<GetPlanDto[]>(plansRequests.getAllPlans);
   },

   getPlansCount: async () => {
      return axiosInstance.get<number>(plansRequests.getPlansCount);
   },

   getPlansBySearch: async (searchKey: string) => {
      return axiosInstance.get<GetPlanDto[]>(plansRequests.getPlansBySearch, {
         params: { searchKey },
      });
   },

};