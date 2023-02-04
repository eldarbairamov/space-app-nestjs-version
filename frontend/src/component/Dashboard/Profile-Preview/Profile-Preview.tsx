import React, { type FC } from "react";

import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import { config } from "../../../config/config";

import style from "./Profile-Preview.module.scss";
import user from "../../../asset/user.png";

export const ProfilePreview: FC = () => {
   const navigate = useNavigate();

   const { username, avatar } = useAppSelector(state => state.userReducer);

   const editProfile = () => navigate("/settings");

   return (
      <div className={ style.ProfilePreview }>

         { avatar && <div className={ style.avatar }><img src={ config.SERVER_URL + avatar } alt="avatar"/></div> }
         { !avatar && <img className={ style.no_avatar } src={ user } alt="no avatar"/> }

         <p className={ style.username }><span> Привіт, </span> { username ? username : "завантаження..." } </p>

         <div className={ style.edit_profile }>
            <p onClick={ editProfile }> Редагувати профіль </p>
            <EditOutlined/>
         </div>

      </div>
   );
};
