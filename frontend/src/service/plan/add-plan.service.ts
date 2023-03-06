import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { plansRequests } from "../../config/configuration";
import { MessageInstance } from "antd/es/message/interface";
import { useAppDispatch } from "../../hook";
import { planAction } from "../../redux/slice";

export function addPlanService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const addPlanFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan>(plansRequests.addPlan);
         dispatch(planAction.addPlan(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { addPlanFn };
}