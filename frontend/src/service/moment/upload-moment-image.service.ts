import React from "react";

import { useDispatch } from "react-redux";
import { IMoment } from "../../interface";
import { errorCatherFn } from "../../helper/error-catcher";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config/configuration";
import { momentActions } from "../../redux/slice";
import { MessageInstance } from "antd/es/message/interface";

export function uploadMomentImageService(messageApi: MessageInstance) {
   const dispatch = useDispatch();

   const uploadPhotoFn = async (event: React.ChangeEvent<HTMLInputElement>, momentId: IMoment["id"]) => {
      try {
         const image = (event.target.files as FileList)[0];
         const formData = new FormData();
         formData.append("photo", image);
         const { data } = await axiosInstance.patch<{ image: string }>(momentsRequests.uploadPhoto + momentId + "/photo_upload", formData);
         dispatch(momentActions.setPhoto({ photo: data.image }));

      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   return { uploadPhotoFn };
}