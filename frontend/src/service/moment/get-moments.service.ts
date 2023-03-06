import { useEffect } from "react";

import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { IMoments } from "../../interface";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config/configuration";
import { momentActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { useAppSelector } from "../../hook";

export function getMomentsService(searchKey: string, messageApi: MessageInstance) {
   const { total } = useAppSelector(state => state.momentReducer);
   const dispatch = useDispatch();

   const getMomentsFn = async () => {
      try {

         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
               limit: total,
            },
         });
         dispatch(momentActions.setMoments(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey, total ]);

}