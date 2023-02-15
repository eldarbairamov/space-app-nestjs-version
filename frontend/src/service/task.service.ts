import { axiosInstance, AxiosRes } from "./axios.service";
import { tasksRequests } from "../config/config";
import { IAddTask, IPlan, ITask } from "../interface";

export const taskService = {

   addTask: async (body: IAddTask) => {
      return axiosInstance.post<ITask>(tasksRequests.addTask, body);
   },

   updateTask: async (taskId: ITask["id"], status: boolean): AxiosRes<void> => {
      return axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });
   },

   deleteTask: async (taskId: ITask["id"], planId: IPlan["id"]): AxiosRes<void> => {
      return axiosInstance.post(tasksRequests.deleteTask + taskId, { planId });
   },

   getAllTasks: async (planId: IPlan["id"]) => {
      return axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
   },

};