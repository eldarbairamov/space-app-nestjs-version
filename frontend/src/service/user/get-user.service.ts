import { useEffect, useState } from "react";

import { userActions } from "../../redux/slice";
import { IGetUserInfo } from "../../interface";
import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { userRequests } from "../../config/config";
import { useAppDispatch } from "../../hook";
import { axiosInstance } from "../axios.service";

export default function getUserService(messageApi: MessageInstance) {
   const [ userInfo, setUserInfo ] = useState<IGetUserInfo>();
   const dispatch = useAppDispatch();

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IGetUserInfo>(userRequests.getUser);
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