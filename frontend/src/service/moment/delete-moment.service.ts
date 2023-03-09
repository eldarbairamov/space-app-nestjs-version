import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { IMoment } from "@src/interface";
import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { App } from "antd";

export function deleteMomentService(next: () => void) {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deleteMomentFn = async (momentId: IMoment["id"]) => {
      try {
         await axiosInstance.delete(momentsRequests.deleteMoment + momentId);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         next();

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { deleteMomentFn };
}