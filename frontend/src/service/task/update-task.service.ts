import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config/config";
import { errorCatherFn } from "../../helper/error-catcher";
import { MessageInstance } from "antd/es/message/interface";
import { ITask } from "../../interface";

export function updateTaskService(messageApi: MessageInstance) {

   const updateTaskFn = async (taskId: ITask["id"], status: boolean) => {
      try {
         await axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updateTaskFn };
}