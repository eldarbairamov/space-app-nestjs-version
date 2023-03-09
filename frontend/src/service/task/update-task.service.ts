import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { errorCatherFn } from "@src/helper/error-catcher";
import { ITask } from "@src/interface";
import { App } from "antd";

export function updateTaskService() {
   const { message } = App.useApp();

   const updateTaskFn = async (taskId: ITask["id"], status: boolean) => {
      try {
         await axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { updateTaskFn };
}