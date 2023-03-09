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
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.getOneMoment + momentId);
         dispatch(momentActions.setActiveMoment(data));
         setPrevState(data);

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getMomentFn();
   }, []);


   return { prevState, setPrevState };
}