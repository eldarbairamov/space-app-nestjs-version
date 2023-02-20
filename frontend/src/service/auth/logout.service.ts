import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { storageService } from "../storage.service";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function logoutService(messageApi: MessageInstance, next: () => any) {

   const logoutFn = async () => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.get(authRequests.logout);

         storageService.deleteTokens();

         messageApi.destroy();
         next();

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { logoutFn };

}