import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { IPlan, IPlans } from "@src/interface";
import { plansRequests } from "@src/config/configuration";
import { planAction } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch } from "@src/hook";

export function deletePlanService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

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
         message.error(errorCatherFn(e));
      }
   };

   return { deletePlanFn };
}