import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { plansRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";
import { useDispatch } from "react-redux";
import { planAction } from "../../redux/slice/plan.slice";

export function deletePlanService(messageApi: MessageInstance) {
   const dispatch = useDispatch();

   const deletePlanFn = async (targetId: IPlan["id"]) => {
      try {
         await axiosInstance.delete(plansRequests.deletePlan + targetId);
         dispatch(planAction.deletePlan(targetId));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deletePlanFn };
}