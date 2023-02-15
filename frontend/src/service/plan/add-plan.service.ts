import { TypedSetState } from "../../interface/common.interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { plansRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export default function addPlanService(setPlans: TypedSetState<IPlan[]>, messageApi: MessageInstance) {

   const addPlanFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan>(plansRequests.addPlan);
         setPlans((prevState) => [ ...prevState, data ].sort((a, b) => b.lastModified - a.lastModified));
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { addPlanFn };
}