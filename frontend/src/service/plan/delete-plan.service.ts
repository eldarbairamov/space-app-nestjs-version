import { TypedSetState } from "../../interface/common.interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { plansRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function deletePlanService(plans: IPlan[], setPlans: TypedSetState<IPlan[]>, messageApi: MessageInstance) {

   const deletePlanFn = async (targetId: IPlan["id"]) => {
      try {
         const updatedArr = plans.filter(item => item.id !== targetId);
         await axiosInstance.delete(plansRequests.deletePlan + targetId);
         setPlans(updatedArr);
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deletePlanFn };
}