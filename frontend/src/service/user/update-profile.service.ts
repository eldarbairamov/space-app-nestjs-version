import { userActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";
import { IGetUserInfo, IUpdateProfile } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config/config";
import { MessageInstance } from "antd/es/message/interface";

export default function updateProfileService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const updateEmailFn = async (body: IUpdateProfile) => {
      try {
         messageApi.loading("Лоудінг..");
         const { data } = await axiosInstance.patch<IGetUserInfo>(userRequests.profileUpdate, body);
         dispatch(userActions.setInfo(data));
         messageApi.destroy();
         messageApi.success("Ви успішно оновили профіль");

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { updateEmailFn };

}