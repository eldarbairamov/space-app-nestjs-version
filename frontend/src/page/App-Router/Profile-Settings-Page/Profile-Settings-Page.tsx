import { ChangeEvent, useRef } from "react";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "@src/hook";
import { AppRouter } from "@src/router";
import { deletePhotoService, uploadPhotoService } from "@src/service";
import { scrollToElement } from "@src/helper/scroll-to-element";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { configuration } from "@src/config/configuration";

import style from "./Profile-Settings-Page.module.scss";
import user from "@src/asset/user.png";

export function ProfileSettingsPage() {
   const { username, name, surname, avatar } = useAppSelector(state => state.userReducer);

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const { uploadPhotoFn } = uploadPhotoService();
   const { deletePhotoFn } = deletePhotoService();

   const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => uploadPhotoFn((event.target.files as FileList)[0]);

   return (
      <motion.div className={ style.ProfileSettingsPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         {/* Left side */ }
         <div className={ style.left_side }>

            {/* Avatar */ }
            <div className={ style.avatar_block }>
               <div>
                  { avatar &&
                     <div className={ style.avatar }>
                        <img src={ `${ configuration.API_URL }/${ avatar }` } alt="avatar"/>
                     </div> }

                  { !avatar && <img className={ style.no_avatar } src={ user } alt="no avatar"/> }
               </div>

               {/* Edit avatar */ }
               <div className={ style.edit_avatar }>
                  <p onClick={ handlePick }> Змінити фото </p>
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

               <p onClick={ () => {
                  scrollToElement();
                  AppRouter.navigate("/settings/password");
               } }>
                  Змінити пароль
               </p>

               <p onClick={ () => {
                  scrollToElement();
                  AppRouter.navigate("/settings/email");
               } }>
                  Змінити електронну пошту
               </p>

            </div>

         </div>

         {/* Right side */ }
         <div id={ "right_side" } className={ style.right_side }>
            <Outlet/>
         </div>

      </motion.div>
   );
}