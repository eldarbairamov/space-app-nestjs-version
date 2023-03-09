import React from "react";

import { IMoment } from "@src/interface";
import { errorCatherFn } from "@src/helper/error-catcher";
import { axiosInstance } from "@src/service";
import { momentsRequests } from "@src/config/configuration";
import { momentActions } from "@src/redux/slice";
import { App } from "antd";
import { useAppDispatch } from "@src/hook";

export function uploadMomentImageService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const uploadPhotoFn = async (event: React.ChangeEvent<HTMLInputElement>, momentId: IMoment["id"]) => {
      try {
         const image = (event.target.files as FileList)[0];
         const formData = new FormData();
         formData.append("photo", image);
         const { data } = await axiosInstance.patch<{ image: string }>(momentsRequests.uploadPhoto + momentId + "/photo_upload", formData);
         dispatch(momentActions.setPhoto({ photo: data.image }));

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { uploadPhotoFn };
}