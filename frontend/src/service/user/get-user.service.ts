import { useEffect } from "react";

import { userActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { userRequests } from "../../config/configuration";
import { useAppDispatch } from "../../hook";
import { axiosInstance } from "../axios.service";
import { IUser } from "../../interface";

export function getUserService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn };
}