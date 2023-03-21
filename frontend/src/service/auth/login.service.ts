import { AxiosApiError, axiosInstance } from "@src/service";
import { ILoginForm, IOAuth } from "@src/interface";
import { storageService } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { UnauthorizedRouter } from "@src/router";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";

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
            message.destroy();
            UnauthorizedRouter.navigate("/activation");
         }
      }
   };

   return { loginFn };
}