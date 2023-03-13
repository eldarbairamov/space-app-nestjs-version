import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { storageService } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";
import { pleaseWait } from "@src/helper/please-wait";

export function logoutService(next: () => any) {
   const { message } = App.useApp();

   const logoutFn = async () => {
      try {
         message.loading("Лоудінг..");
         await axiosInstance.get(authRequests.logout);
         storageService.deleteTokens();
         await pleaseWait(1000)
         message.destroy();
         next();

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { logoutFn };

}