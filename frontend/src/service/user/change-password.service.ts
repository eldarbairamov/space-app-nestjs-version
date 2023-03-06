import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config/configuration";
import { MessageInstance } from "antd/es/message/interface";
import { pleaseWait } from "../../helper/please-wait";

export function changePasswordService(messageApi: MessageInstance, next: () => any) {

   const updatePasswordFn = async (newPassword: string, currentPassword: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
         messageApi.destroy();
         await pleaseWait(1000);
         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updatePasswordFn };

}