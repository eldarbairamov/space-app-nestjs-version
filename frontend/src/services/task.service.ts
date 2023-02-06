import { axiosInstance, AxiosRes } from "./axios.service";
import { tasksRequests } from "../config/config";
import { IAddTask, ITask } from "../interface";

export const taskService = {

   addTask: async (dto: IAddTask) => {
      return axiosInstance.post<ITask>(tasksRequests.addTask, dto);
   },

   updateTask: async (taskId: string, status: boolean): AxiosRes<void> => {
      return axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });
   },

   deleteTask: async (taskId: string, planId: string): AxiosRes<void> => {
      return axiosInstance.post(tasksRequests.deleteTask + taskId, { planId });
   },

   getAllTasks: async (planId: string) => {
      return axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
   },

};