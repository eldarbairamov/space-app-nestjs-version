import { useEffect } from "react";

import { IPlan, ITask } from "@src/interface";
import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { errorCatherFn } from "@src/helper/error-catcher";
import { useAppDispatch } from "@src/hook";
import { taskAction } from "@src/redux/slice";
import { App } from "antd";

export function getTasksService(planId: IPlan["id"]) {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const getTasksFn = async () => {
      try {
         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         dispatch(taskAction.setTasks(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getTasksFn();
   }, []);


}