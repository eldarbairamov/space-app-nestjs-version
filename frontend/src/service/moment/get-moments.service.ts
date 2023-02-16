import { useEffect } from "react";

import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { IMoments } from "../../interface";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config/config";
import { momentActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function getMomentsService(searchKey: string, messageApi: MessageInstance) {
   const dispatch = useDispatch();

   const getMomentsFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, { params: { searchKey: searchKey || null } });
         dispatch(momentActions.setMoments(data.data));
         dispatch(momentActions.setTags(data.tagsForFilter))

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey ]);

}