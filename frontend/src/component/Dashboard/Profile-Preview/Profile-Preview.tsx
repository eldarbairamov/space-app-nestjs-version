import React, { FC } from "react";

import { EditOutlined } from "@ant-design/icons";
import { config } from "../../../config/config";
import { message } from "antd";
import { AppRouter } from "../../../router";
import getUserService from "../../../service/user/get-user.service";

import style from "./Profile-Preview.module.scss";
import user from "../../../asset/user.png";

export const ProfilePreview: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { userInfo } = getUserService(messageApi);

   const editProfile = () => AppRouter.navigate("/settings");

   return (
      <div className={ style.ProfilePreview }>
         { contextHolder }

         {/* Avatar */ }
         { userInfo?.avatar && <div className={ style.avatar }><img src={ config.SERVER_URL + userInfo.avatar } alt="avatar"/></div> }
         { !userInfo?.avatar && <img className={ style.no_avatar } src={ user } alt="no avatar"/> }

         {/* Username */ }
         <p className={ style.username }>
            <span> Привіт, </span> { userInfo?.username ? userInfo.username : "завантажую..." } </p>

         {/* Edit profile */ }
         <div className={ style.edit_profile }>
            <p onClick={ editProfile }> Редагувати профіль </p>
            <EditOutlined/>
         </div>

      </div>
   );
};
