import { wait } from "../../helper/wait.helper";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { ILoginForm, IOAuth } from "../../interface";
import { storageService } from "../storage.service";
import { authRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function loginService(messageApi: MessageInstance, next: () => any) {

   const loginFn = async (body: ILoginForm) => {
      try {
         messageApi.loading("Лоудінг..");
         const { data } = await axiosInstance.post<IOAuth>(authRequests.login, body);

         storageService.setAccessToken(data.accessToken);
         storageService.setRefreshToken(data.refreshToken);

         messageApi.destroy();
         messageApi.success(`Привіт, ${ data.username }`);
         await wait(2000);

         next();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { loginFn };
}