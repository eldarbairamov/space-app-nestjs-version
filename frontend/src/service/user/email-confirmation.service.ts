import { useEffect, useState } from "react";
import { errorCatherFn } from "../../helper/error-catcher";
import { MessageInstance } from "antd/es/message/interface";
import { userRequests } from "../../config/config";
import { axiosInstance } from "../axios.service";

export function emailConfirmationService(messageApi: MessageInstance, token: string) {
   const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string>('')

   const confirmEmailFn = async () => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken: token });
         messageApi.destroy();
         setIsSuccess(true);

      } catch (e) {
         messageApi.destroy();
         setErrorMessage(errorCatherFn(e));
         setIsSuccess(false);
      }
   };

   useEffect(() => {
      confirmEmailFn();
   }, []);

   return { isSuccess, errorMessage };
}