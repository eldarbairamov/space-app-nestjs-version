import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { ITask } from "@src/interface";
import { App } from "antd";

export function deleteTaskService() {
   const { message } = App.useApp();

   const deleteTaskFn = async (taskId: ITask["id"]) => {
      try {
         await axiosInstance.delete(tasksRequests.deleteTask + taskId);

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { deleteTaskFn };
}