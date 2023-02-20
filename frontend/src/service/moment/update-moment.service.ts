import { TypedSetState } from "../../interface/common.interface";
import { IMoment } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export function updateMomentService(setPrevState: TypedSetState<IMoment | undefined>, messageApi: MessageInstance) {

   const updateMomentFn = async (activeMoment: IMoment) => {
      try {
         const clone = Object.assign({}, activeMoment) as Partial<IMoment>;
         delete clone.id;
         delete clone.createdAt;
         await axiosInstance.patch(momentsRequests.updateMoment + activeMoment.id, clone);
         setPrevState(activeMoment as IMoment);
         messageApi.success("Збережено");

      } catch (e) {
         messageApi.destroy()
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updateMomentFn };
}