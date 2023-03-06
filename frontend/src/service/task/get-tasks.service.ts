import { useEffect } from "react";

import { IPlan, ITask } from "../../interface";
import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config/configuration";
import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { useAppDispatch } from "../../hook";
import { taskAction } from "../../redux/slice";

export function getTasksService(messageApi: MessageInstance, planId: IPlan["id"]) {
   const dispatch = useAppDispatch();

   const getTasksFn = async () => {
      try {
         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         dispatch(taskAction.setTasks(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getTasksFn();
   }, []);


}