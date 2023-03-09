import { TypedSetState } from "@src/interface/common.interface";
import { IMoment } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { App } from "antd";

export function updateMomentService(setPrevState: TypedSetState<IMoment | undefined>) {
   const { message } = App.useApp();

   const updateMomentFn = async (activeMoment: IMoment) => {
      try {
         const clone = Object.assign({}, activeMoment) as Partial<IMoment>;
         delete clone.id;
         delete clone.createdAt;
         await axiosInstance.patch(momentsRequests.updateMoment + activeMoment.id, clone);
         setPrevState(activeMoment as IMoment);
         message.success("Збережено");

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { updateMomentFn };
}