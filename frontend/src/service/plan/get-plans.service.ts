import { useEffect } from "react";

import { MessageInstance } from "antd/es/message/interface";
import { IPlans } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config/configuration";
import { useDebounce } from "../../hook";
import { useAppDispatch, useAppSelector } from "../../hook";
import { planAction } from "../../redux/slice";

export function getPlansService(messageApi: MessageInstance) {
   const { searchKey, total } = useAppSelector(state => state.planReducer);
   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getPlansFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlans>(plansRequests.getAllPlans, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });

         dispatch(planAction.setPlans(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced, total ]);

}