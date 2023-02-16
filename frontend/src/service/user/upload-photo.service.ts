import { errorCatherFn } from "../../helper/catch-error.helper";
import { MessageInstance } from "antd/es/message/interface";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config/config";
import { userActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";

export function uploadPhotoService(messageApi: MessageInstance) {
   const dispatch = useAppDispatch();

   const uploadPhotoFn = async (image: File) => {
      try {
         messageApi.loading("Лоудінг..");
         const formData = new FormData();
         formData.append("avatar", image);

         const { data } = await axiosInstance.patch<{ image: string }>(userRequests.uploadAvatar, formData);
         dispatch(userActions.setAvatar(data.image));
         messageApi.destroy();

      } catch (e) {
         messageApi.destroy();
         messageApi.error(errorCatherFn(e));
      }
   };

   return { uploadPhotoFn };

}