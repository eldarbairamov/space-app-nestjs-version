import { MessageInstance } from "antd/es/message/interface";
import { IUser } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { useAppDispatch } from "../../hook";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config/config";
import { userActions } from "../../redux/slice";

export default function deletePhotoService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const deletePhotoFn = async (avatar: IUser["avatar"]) => {
      try {
         await axiosInstance.patch(userRequests.deleteAvatar, { fileName: avatar });
         dispatch(userActions.unsetAvatar());
      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { deletePhotoFn };

}