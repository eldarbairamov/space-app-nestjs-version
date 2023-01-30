import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { tasksRequests } from "../config/config";
import { type ITaskDto } from "../interface";

export const taskService = {

   addTask: async (planId: string, title: string) => {
      const taskDto = { title, planId };
      return axiosInstance.post<ITaskDto>(tasksRequests.addTask, taskDto);
   },

   updateTask: async (taskId: string, status: boolean): Promise<AxiosResponse> => {
      const taskDto = { isCompleted: status };
      return axiosInstance.patch(tasksRequests.updateTask + taskId, taskDto);
   },

   deleteTask: async (taskId: string): Promise<AxiosResponse> => axiosInstance.delete(tasksRequests.deleteTask + taskId),

   getAllTasks: async (planId: string) => {
      const taskDto = { planId };
      return axiosInstance.post<ITaskDto[]>(tasksRequests.getAllTasks, taskDto);
   },

};