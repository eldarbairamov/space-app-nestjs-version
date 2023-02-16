import { wait } from "../../helper/wait.helper";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function resetPasswordService(messageApi: MessageInstance, next: () => any) {

   const resetPasswordFn = async (password: string, token: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.patch(authRequests.resetPassword, { resetPasswordToken: token, password });

         messageApi.destroy();
         messageApi.success("Вітаємо! У вас новий пароль.");
         await wait(2000);

         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { resetPasswordFn };
}