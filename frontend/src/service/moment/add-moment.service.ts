import { IMoment } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";

export function addMomentService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addMomentFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { addMomentFn };
}