import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config/config";
import { IMoment } from "../../interface";
import { MessageInstance } from "antd/es/message/interface";
import { momentActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";

export function deleteMomentService(messageApi: MessageInstance, next: () => void) {
   const dispatch = useAppDispatch();

   const deleteMomentFn = async (momentId: IMoment["id"]) => {
      try {
         await axiosInstance.delete(momentsRequests.deleteMoment + momentId);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         next();

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deleteMomentFn };
}