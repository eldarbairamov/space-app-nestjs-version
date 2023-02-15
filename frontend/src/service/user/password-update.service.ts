import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";
import { wait } from "../../helper/wait.helper";

export default function passwordUpdateService(messageApi: MessageInstance, next: () => any) {

   const updatePasswordFn = async (newPassword: string, currentPassword: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
         messageApi.destroy();
         await wait(1000)
         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updatePasswordFn };

}