import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { IRegistration } from "../../interface";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function registrationService(messageApi: MessageInstance, next: () => any) {

   const registrationFn = async (body: IRegistration) => {
      try {
         messageApi.loading("Лоудінг..");
         await axiosInstance.post(authRequests.registration, body);
         next()

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { registrationFn };
}