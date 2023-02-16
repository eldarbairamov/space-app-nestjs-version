import { useEffect, useState } from "react";

import { userActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { userRequests } from "../../config/config";
import { useAppDispatch } from "../../hook";
import { axiosInstance } from "../axios.service";
import { IUser } from "../../interface";

export function getUserService(messageApi: MessageInstance) {
   const [ userInfo, setUserInfo ] = useState<IUser>({} as IUser);
   const dispatch = useAppDispatch();

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));
         setUserInfo(data);

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { userInfo, getUserFn };
}