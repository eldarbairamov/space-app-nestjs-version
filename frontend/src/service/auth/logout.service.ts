import { axiosInstance } from "@src/service";
import { storageService } from "@src/service";
import { authRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { authActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";

export function logoutService(next: () => any) {
   const { message } = App.useApp();
   const dispatch = useAppDispatch()

   const logoutFn = async () => {
      try {
         message.loading("Лоудінг..");
         await axiosInstance.get(authRequests.logout);
         storageService.deleteTokens();
         await pleaseWait(1000)
         message.destroy();
         dispatch(authActions.setIsLogin(false))

         next();

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { logoutFn };

}
