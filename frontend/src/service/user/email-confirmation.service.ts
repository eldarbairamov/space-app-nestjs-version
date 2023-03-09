import { useEffect, useState } from "react";

import { errorCatherFn } from "@src/helper/error-catcher";
import { userRequests } from "@src/config/configuration";
import { axiosInstance } from "@src/service";
import { App } from "antd";

export function emailConfirmationService(token: string) {
   const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
   const [ errorMessage, setErrorMessage ] = useState<string>("");
   const { message } = App.useApp();

   const confirmEmailFn = async () => {
      try {
         message.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken: token });
         message.destroy();
         setIsSuccess(true);

      } catch (e) {
         message.destroy();
         setErrorMessage(errorCatherFn(e));
         setIsSuccess(false);
      }
   };

   useEffect(() => {
      confirmEmailFn();
   }, []);

   return { isSuccess, errorMessage };
}