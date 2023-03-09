import { useEffect, useState } from "react";

import { IPlan } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { plansRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { App } from "antd";

export function getOnePlanService(planId: IPlan["id"]) {
   const [ planTitle, setPlanTitle ] = useState<string>("");
   const { message } = App.useApp();

   const dispatch = useAppDispatch();

   const getOnePlan = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan>(plansRequests.getOnePlan + planId);
         dispatch(planAction.setActivePlan(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getOnePlan();
   }, []);

   return { planTitle, setPlanTitle };

}