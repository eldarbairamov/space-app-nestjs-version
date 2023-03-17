import { useEffect } from "react";

import { axiosInstance } from "@src/service";
import { IMoments } from "@src/interface";
import { useDispatch } from "react-redux";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { useAppSelector } from "@src/hook";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function getMomentsService(searchKey: string) {
   const { total } = useAppSelector(state => state.momentReducer);
   const dispatch = useDispatch();
   const { message } = App.useApp();

   const getMomentsFn = async () => {
      try {
         dispatch(momentActions.setIsLoading(true))
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
               limit: total,
            },
         });
         dispatch(momentActions.setMoments(data));

      } catch (e) {
         dispatch(momentActions.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(momentActions.setIsLoading(false))
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey, total ]);

}