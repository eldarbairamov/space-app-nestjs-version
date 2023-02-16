import { wait } from "../../helper/wait.helper";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function activationService(messageApi: MessageInstance, next: () => any) {

   const activationFn = async (body: string) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.post(authRequests.accountActivation, { activationCode: body });
         messageApi.destroy();
         messageApi.success("Аккаунт активований");
         await wait(2000);
         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { activationFn };
}