import { type AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";
import { type IPlanDto } from "../interface";

export const planService = {

   addPlan: async () => axiosInstance.get<IPlanDto>("/plans/add"),

   deletePlan: async (planId: string): Promise<AxiosResponse> => axiosInstance.delete(`/plans/${ planId }`),

   updatePlan: async (planId: string, title: string): Promise<AxiosResponse> => {
      const planDto = { title };
      return axiosInstance.put(`/plans/${ planId }`, planDto);
   },

   getAllPlans: async () => axiosInstance.get<IPlanDto[]>("/plans"),

   getPlansCount: async () => axiosInstance.get<number>("/plans/count"),

};