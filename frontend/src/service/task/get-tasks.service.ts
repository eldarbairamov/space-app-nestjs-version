import { useEffect, useState } from "react";

import { IPlan, ITask } from "../../interface";
import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/catch-error.helper";

export function getTasksService(messageApi: MessageInstance, planId: IPlan["id"]) {
   const [ tasks, setTasks ] = useState<ITask[]>([]);

   const getTasksFn = async () => {
      try {
         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         setTasks(data);
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getTasksFn();
   }, []);

   return { setTasks, tasks };

}