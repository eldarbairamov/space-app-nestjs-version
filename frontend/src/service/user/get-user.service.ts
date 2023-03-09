import { useEffect } from "react";

import { userActions } from "@src/redux/slice";
import { errorCatherFn } from "@src/helper/error-catcher";
import { userRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { axiosInstance } from "@src/service";
import { IUser } from "@src/interface";
import { App } from "antd";

export function getUserService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn };
}