import { useEffect, useState } from "react";

import { MessageInstance } from "antd/es/message/interface";
import { IPlan } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config/configuration";
import { useAppDispatch } from "../../hook";
import { planAction } from "../../redux/slice";

export function getOnePlanService(messageApi: MessageInstance, planId: IPlan["id"]) {
   const [ planTitle, setPlanTitle ] = useState<string>("");

   const dispatch = useAppDispatch();

   const getOnePlan = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan>(plansRequests.getOnePlan + planId);
         dispatch(planAction.setActivePlan(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getOnePlan();
   }, []);

   return { planTitle, setPlanTitle };

}