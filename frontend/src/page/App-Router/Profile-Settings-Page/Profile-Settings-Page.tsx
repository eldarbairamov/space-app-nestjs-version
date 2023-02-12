import React, { FC, useRef } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { userActions } from "../../../redux/slice";
import { config } from "../../../config/config";
import { userService } from "../../../services";
import { catchErrors } from "../../../helper";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Profile-Settings-Page.module.scss";
import user from "../../../asset/user.png";

export const ProfileSettingsPage: FC = () => {
   const { username, name, surname, avatar } = useAppSelector(state => state.userReducer);

   const filePicker = useRef<HTMLInputElement>(null);

   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
         const image = (event.target.files as FileList)[0];

         const formData = new FormData();
         formData.append("avatar", image);

         const imageName = await userService.uploadAvatar(formData);

         dispatch(userActions.setAvatar(imageName));

      } catch (e) {
         catchErrors(e);
      }
   };

   const handlePick = () => {
      filePicker.current!.click();
   };

   const deleteAvatar = async () => {
      try {
         await userService.deleteAvatar(avatar);
         dispatch(userActions.unsetAvatar());
      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <div className={ style.ProfileSettingsPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         {/* Left side */ }
         <div className={ style.left_side }>
            <div className={ style.avatar_block }>
               <div>
                  { avatar &&
                     <div className={ style.avatar }><img src={ config.SERVER_URL + avatar } alt="avatar"/></div> }
                  { !avatar && <img className={ style.no_avatar } src={ user } alt="no avatar"/> }
               </div>
               <div className={ style.edit_avatar }>
                  <p onClick={ handlePick }> Змінити </p>
                  { !!avatar && <p> | </p> }
                  { !!avatar && <p onClick={ deleteAvatar }> Видалити </p> }
                  <input ref={ filePicker } type={ "file" } onChange={ uploadPhoto }/>
               </div>
            </div>

            <div className={ style.name_block }>
               <p className={ style.username }>
                  { username && username }
               </p>
               <p className={ style.fullname }>
                  { (surname && name) && `${ name } ${ surname }` }
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