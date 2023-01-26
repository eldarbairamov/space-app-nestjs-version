import { type AxiosResponse } from "axios";
import { axiosInstance } from "./axios.service";
import { type IPlanDto } from "../interface";

export const PlanService = {

   addPlan: (): Promise<AxiosResponse> => {
      return axiosInstance.get("/plans/add");
   },

   deletePlan: (planId: string): Promise<AxiosResponse> => {
      return axiosInstance.delete(`/plans/${ planId }`);
   },

   updatePlan: (planId: string, plan: IPlanDto): Promise<AxiosResponse> => {
      return axiosInstance.put(`/plans/${ planId }`, plan);
   },

   getAllPlans: (): Promise<AxiosResponse> => {
      return axiosInstance.get("/plans");
   },

};