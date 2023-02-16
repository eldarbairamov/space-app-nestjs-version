import { IMoment } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config/config";
import { momentActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";
import { useAppDispatch } from "../../hook";

export function addMomentService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const addMomentFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { addMomentFn };
}