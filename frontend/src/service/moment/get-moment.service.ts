import { useEffect, useState } from "react";

import { IMoment } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config/configuration";
import { momentActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function getMomentService(momentId: IMoment["id"], messageApi: MessageInstance) {
   const [ prevState, setPrevState ] = useState<IMoment>();

   const dispatch = useDispatch();

   const getMomentFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.getOneMoment + momentId);
         dispatch(momentActions.setActiveMoment(data));
         setPrevState(data);

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getMomentFn();
   }, []);


   return { prevState, setPrevState };
}