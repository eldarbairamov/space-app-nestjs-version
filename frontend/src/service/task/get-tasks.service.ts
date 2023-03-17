import { useEffect } from "react";

import { IPlan, ITask } from "@src/interface";
import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { taskAction } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function getTasksService(planId: IPlan["id"]) {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const getTasksFn = async () => {
      try {
         dispatch(taskAction.setIsLoading(true))

         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         dispatch(taskAction.setTasks(data));

      } catch (e) {
         dispatch(taskAction.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(taskAction.setIsLoading(false))
      }
   };

   useEffect(() => {
      getTasksFn();
   }, []);


}