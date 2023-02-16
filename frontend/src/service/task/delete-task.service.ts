import { errorCatherFn } from "../../helper/catch-error.helper";
import { MessageInstance } from "antd/es/message/interface";
import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config/config";
import { IPlan, ITask } from "../../interface";

export function deleteTaskService(messageApi: MessageInstance) {

   const deleteTaskFn = async (taskId: ITask["id"], planId: IPlan["id"]) => {
      try {
         await axiosInstance.post(tasksRequests.deleteTask + taskId, { planId });

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deleteTaskFn };
}