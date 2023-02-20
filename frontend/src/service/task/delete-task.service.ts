import { errorCatherFn } from "../../helper/error-catcher";
import { MessageInstance } from "antd/es/message/interface";
import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config/config";
import { ITask } from "../../interface";

export function deleteTaskService(messageApi: MessageInstance) {

   const deleteTaskFn = async (taskId: ITask["id"]) => {
      try {
         await axiosInstance.delete(tasksRequests.deleteTask + taskId);

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deleteTaskFn };
}