import { IPlan } from "../../interface";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config/configuration";
import { errorCatherFn } from "../../helper/error-catcher";
import { MessageInstance } from "antd/es/message/interface";

export function updatePlanService(messageApi: MessageInstance) {

   const updatePlanFn = async (planId: IPlan["id"], title: IPlan["title"]): Promise<void> => {
      try {
         await axiosInstance.put(plansRequests.updatePlan + planId, { title });

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updatePlanFn };

}