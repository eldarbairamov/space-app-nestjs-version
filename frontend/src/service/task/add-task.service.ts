import { axiosInstance } from "@src/service";
import { ITask } from "@src/interface";
import { tasksRequests } from "@src/config/configuration";
import { errorCatherFn } from "@src/helper/error-catcher";
import { App } from "antd";

export function addTaskService() {
   const { message } = App.useApp();

   const addTaskFn = async (newTask: { planId: string, title: string }) => {
      try {
         const { data } = await axiosInstance.post<ITask>(tasksRequests.addTask, newTask);
         return data;

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { addTaskFn };
}