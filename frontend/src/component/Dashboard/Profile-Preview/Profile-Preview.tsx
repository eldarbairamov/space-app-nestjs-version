import React, { type FC, useEffect } from "react";

import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import style from "./Profile-Preview.module.scss";
import { useAppSelector } from "../../../hook/redux.hook";

export const ProfilePreview: FC = () => {
   const navigate = useNavigate();

   const { username } = useAppSelector(state => state.authReducer);

   const editProfile = () => navigate("/settings");

   return (
      <div className={ style.ProfilePreview }>

         <UserOutlined style={ { fontSize: "100px" } }/>

         <p className={ style.username }><span> Привіт, </span> { username ? username : "завантаження..." } </p>

         <div className={ style.edit_profile }>
            <p onClick={ editProfile }> Редагувати профіль </p>
            <EditOutlined/>
         </div>

      </div>
   );
};
