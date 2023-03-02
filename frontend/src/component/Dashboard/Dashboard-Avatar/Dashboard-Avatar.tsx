import React from "react";

import user from "../../../asset/user.png";
import { config } from "../../../config/config";
import { useAppSelector } from "../../../hook";

import style from "./Dashboard-Avatar.module.scss";

export function DashboardAvatar() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardAvatar }>

         { avatar &&
            <div className={ style.avatar }><img src={ config.SERVER_URL + avatar } alt="avatar"/></div> }

         { !avatar &&
            <img className={ style.no_avatar } src={ user } alt="no avatar"/> }

      </div>
   );
}
