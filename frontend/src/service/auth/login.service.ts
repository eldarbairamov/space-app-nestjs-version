import { pleaseWait } from "@src/helper/please-wait";
import { errorCatherFn } from "@src/helper/error-catcher";
import { AxiosApiError, axiosInstance } from "@src/service";
import { ILoginForm, IOAuth } from "@src/interface";
import { storageService } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { WelcomeRouter } from "@src/router";
import { App } from "antd";

export function loginService(next: () => any) {
   const { message } = App.useApp();

   const loginFn = async (body: ILoginForm) => {
      try {
         message.loading("Лоудінг..");
         const { data } = await axiosInstance.post<IOAuth>(authRequests.login, body);

         storageService.setTokens(data.accessToken, data.refreshToken);

         message.destroy();
         message.success(`Привіт, ${ data.username }`);
         await pleaseWait(2000);

         next();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));

         const responseMessage = (e as AxiosApiError).response?.data.message;
         if (responseMessage === "Account is not activated") {
            await pleaseWait(2000);
            WelcomeRouter.navigate("/activation");
         }
      }
   };

   return { loginFn };
}