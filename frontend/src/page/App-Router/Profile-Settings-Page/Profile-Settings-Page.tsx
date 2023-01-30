import React, { type FC, useEffect } from "react";

import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import { Toaster } from "react-hot-toast";

import style from "./Profile-Settings-Page.module.scss";

export const ProfileSettingsPage: FC = () => {
   const navigate = useNavigate();

   const { username, name, surname, avatar } = useAppSelector(state => state.authReducer);

   return (
      <div className={ style.ProfileSettingsPage }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         {/* Left side */ }
         <div className={ style.left_side }>

            <div className={ style.avatar_block }>
               <div>
                  { avatar && avatar }
                  { !avatar && <UserOutlined style={ { fontSize: "150px" } }/> }
               </div>
               <div className={ style.edit_avatar }>
                  <p> Редагувати фото </p>
                  <CameraOutlined/>
               </div>
               {/*<button> Зберегти</button>*/ }
            </div>

            <div className={ style.name_block }>
               <p className={ style.username }>
                  { username }
               </p>
               <p className={ style.fullname }>
                  { (surname && name) && `${ surname } ${ name }` }
                  { (name && !surname) && name }
                  { (surname && !name) && surname }
               </p>
            </div>

            <div className={ style.auth_settings }>
               <p onClick={ () => navigate("/settings/password") }> Змінити пароль </p>
               <p onClick={ () => navigate("/settings/email") }> Змінити електронну пошту </p>
            </div>

         </div>

         {/* Right side */ }
         <div className={ style.right_side }>
            <Outlet/>
         </div>

      </div>
   );
};
