import { axiosInstance } from "@src/service";
import { ITask } from "@src/interface";
import { tasksRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function addTaskService() {
   const { message } = App.useApp();

   const addTaskFn = async (newTask: { planId: string, title: string }) => {
      try {
         message.loading("Лоудінг..");
         const { data } = await axiosInstance.post<ITask>(tasksRequests.addTask, newTask);
         message.destroy();
         return data;

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { addTaskFn };
}