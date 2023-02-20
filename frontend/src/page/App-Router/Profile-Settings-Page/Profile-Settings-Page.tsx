import React, { useRef } from "react";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import { config } from "../../../config/config";
import { AppRouter } from "../../../router";
import { message } from "antd";
import { deletePhotoService, uploadPhotoService } from "../../../service";

import style from "./Profile-Settings-Page.module.scss";
import user from "../../../asset/user.png";

export function ProfileSettingsPage() {
   const { username, name, surname, avatar } = useAppSelector(state => state.userReducer);
   const [ messageApi, contextHolder ] = message.useMessage();

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const { uploadPhotoFn } = uploadPhotoService(messageApi);
   const { deletePhotoFn } = deletePhotoService(messageApi);

   const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => uploadPhotoFn((event.target.files as FileList)[0]);

   return (
      <div className={ style.ProfileSettingsPage }>
         { contextHolder }

         {/* Left side */ }
         <div className={ style.left_side }>

            {/* Avatar */ }
            <div className={ style.avatar_block }>
               <div>
                  { avatar &&
                     <div className={ style.avatar }>
                        <img src={ config.SERVER_URL + avatar } alt="avatar"/>
                     </div> }

                  { !avatar && <img className={ style.no_avatar } src={ user } alt="no avatar"/> }
               </div>

               {/* Edit avatar */ }
               <div className={ style.edit_avatar }>
                  <p onClick={ handlePick }> Змінити </p>
                  { !!avatar && <p> | </p> }
                  { !!avatar && <p onClick={ () => deletePhotoFn(avatar) }> Видалити </p> }
                  <input ref={ filePicker } type={ "file" } onChange={ uploadPhoto }/>
               </div>
            </div>

            {/* Name section */ }
            <div className={ style.name_section }>
               <p className={ style.username }> { username && username } </p>
               <p className={ style.fullname }>
                  { (surname && name) && `${ name } ${ surname }` }
                  { (name && !surname) && name }
                  { (surname && !name) && surname }
               </p>
            </div>

            {/* Auth settings */ }
            <div className={ style.auth_settings }>
               <p onClick={ () => AppRouter.navigate("/settings/password") }> Змінити пароль </p>
               <p onClick={ () => AppRouter.navigate("/settings/email") }> Змінити електронну пошту </p>
            </div>

         </div>

         {/* Right side */ }
         <div className={ style.right_side }>
            <Outlet/>
         </div>

      </div>
   );
}