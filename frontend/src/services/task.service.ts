import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { tasksRequests } from "../config/config";
import { GetTaskDto } from "../dto";
import { AddTaskDto } from "../dto/add-task.dto";

export const taskService = {

   addTask: async (dto: AddTaskDto) => {
      return axiosInstance.post<GetTaskDto>(tasksRequests.addTask, dto);
   },

   updateTask: async (taskId: string, status: boolean): Promise<AxiosResponse> => {
      return axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });
   },

   deleteTask: async (taskId: string, planId: string): Promise<AxiosResponse> => {
      return axiosInstance.post(tasksRequests.deleteTask + taskId, { planId });
   },

   getAllTasks: async (planId: string) => {
      return axiosInstance.post<GetTaskDto[]>(tasksRequests.getAllTasks, { planId });
   },

};