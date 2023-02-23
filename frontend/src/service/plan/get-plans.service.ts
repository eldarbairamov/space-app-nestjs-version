import { useEffect } from "react";

import { MessageInstance } from "antd/es/message/interface";
import { IPlan } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config/config";
import { useDebounce } from "../../hook";
import { useAppDispatch, useAppSelector } from "../../hook";
import { planAction } from "../../redux/slice/plan.slice";

export function getPlansService(messageApi: MessageInstance) {
   const { searchKey } = useAppSelector(state => state.planReducer);
   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getPlansFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan[]>(plansRequests.getAllPlans, { params: { searchKey: debounced || null } });
         dispatch(planAction.setPlans(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));

      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced ]);

}