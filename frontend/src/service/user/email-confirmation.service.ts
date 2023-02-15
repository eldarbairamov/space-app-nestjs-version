import { useEffect } from "react";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { MessageInstance } from "antd/es/message/interface";
import { userRequests } from "../../config/config";
import { axiosInstance } from "../axios.service";

export default function emailConfirmationService(messageApi: MessageInstance, token: string) {

   const confirmEmailFn = async () => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken: token });
         messageApi.destroy();
      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      confirmEmailFn();
   }, []);

}