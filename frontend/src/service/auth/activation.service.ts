import { pleaseWait } from "@src/helper/please-wait";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";

export function activationService(next: () => any) {
   const { message } = App.useApp();

   const activationFn = async (body: string) => {
      try {
         message.loading("Лоудінг..");
         await axiosInstance.post(authRequests.accountActivation, { activationCode: body });
         message.destroy();
         message.success("Ваш аккаунт активовано");
         await pleaseWait(2000);
         message.destroy();
         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { activationFn };
}