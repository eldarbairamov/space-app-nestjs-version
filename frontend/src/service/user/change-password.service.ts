import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { userRequests } from "@src/config/configuration";
import { pleaseWait } from "@src/helper/please-wait";
import { App } from "antd";

export function changePasswordService(next: () => any) {
   const { message } = App.useApp();

   const updatePasswordFn = async (newPassword: string, currentPassword: string) => {
      try {
         message.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
         await pleaseWait(1000);
         message.destroy();
         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { updatePasswordFn };

}