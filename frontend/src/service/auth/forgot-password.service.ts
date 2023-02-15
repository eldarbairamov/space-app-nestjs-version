import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export default function forgotPasswordService(messageApi: MessageInstance, next: () => any) {

   const forgotPasswordFn = async (email: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.post<{ message: string }>(authRequests.forgotPassword, { email });
         messageApi.destroy();
         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { forgotPasswordFn };
}