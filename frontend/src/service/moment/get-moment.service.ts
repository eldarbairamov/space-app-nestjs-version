import { useEffect, useState } from "react";

import { IMoment } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch } from "@src/hook";

export function getMomentService(momentId: IMoment["id"]) {
   const [ prevState, setPrevState ] = useState<IMoment>();
   const { message } = App.useApp();

   const dispatch = useAppDispatch();

   const getMomentFn = async () => {
      try {
         dispatch(momentActions.setIsLoading(true))

         const { data } = await axiosInstance.get<IMoment>(momentsRequests.getOneMoment + momentId);
         dispatch(momentActions.setActiveMoment(data));
         setPrevState(data);

      } catch (e) {
         dispatch(momentActions.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(momentActions.setIsLoading(false))
      }
   };

   useEffect(() => {
      getMomentFn();
   }, []);


   return { prevState, setPrevState };
}