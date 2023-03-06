import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { IPlan, IPlans } from "../../interface";
import { plansRequests } from "../../config/configuration";
import { MessageInstance } from "antd/es/message/interface";
import { useDispatch } from "react-redux";
import { planAction } from "../../redux/slice";

export function deletePlanService(messageApi: MessageInstance) {
   const dispatch = useDispatch();

   const deletePlanFn = async (targetId: IPlan["id"], total: number, searchKey: string) => {
      try {
         const { data } = await axiosInstance.post<IPlans>(plansRequests.deletePlan + targetId, {
            params: {
               searchKey,
               limit: total,
            },
         });
         dispatch(planAction.deletePlan(targetId));
         dispatch(planAction.setPlans(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deletePlanFn };
}