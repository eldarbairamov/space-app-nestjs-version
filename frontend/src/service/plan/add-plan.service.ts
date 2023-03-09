import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { IPlan } from "@src/interface";
import { plansRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { App } from "antd";

export function addPlanService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addPlanFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan>(plansRequests.addPlan);
         dispatch(planAction.addPlan(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { addPlanFn };
}