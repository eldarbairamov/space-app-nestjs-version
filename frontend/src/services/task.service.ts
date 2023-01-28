import { type ITaskDto } from "../interface/task.interface";
import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";

export const taskService = {

   addTask: async (planId: string, title: string) => {
      const taskDto = { title, planId };
      return axiosInstance.post<ITaskDto>("/tasks/add", taskDto);
   },

   updateTask: async (taskId: string, status: boolean): Promise<AxiosResponse> => {
      const taskDto = { isCompleted: status };
      return axiosInstance.patch(`/tasks/${ taskId }`, taskDto);
   },

   deleteTask: async (taskId: string): Promise<AxiosResponse> => axiosInstance.delete(`/tasks/${ taskId }`),

   getAllTasks: async (planId: string) => {
      const taskDto = { planId };
      return axiosInstance.post<ITaskDto[]>("/tasks", taskDto);
   },

};