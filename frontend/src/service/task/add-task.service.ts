import { MessageInstance } from "antd/es/message/interface";
import { axiosInstance } from "../axios.service";
import { ITask } from "../../interface";
import { tasksRequests } from "../../config/configuration";
import { errorCatherFn } from "../../helper/error-catcher";

export function addTaskService(messageApi: MessageInstance) {

   const addTaskFn = async (newTask: { planId: string, title: string }) => {
      try {
         const { data } = await axiosInstance.post<ITask>(tasksRequests.addTask, newTask);
         return data;

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { addTaskFn };
}