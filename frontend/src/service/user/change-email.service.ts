import { MessageInstance } from "antd/es/message/interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { userRequests } from "../../config/config";
import { axiosInstance } from "../axios.service";

export function changeEmailService(messageApi: MessageInstance, next: () => any) {

   const updateEmailFn = async (email: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.post(userRequests.changeEmail, { email });
         messageApi.destroy();
         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updateEmailFn };

}