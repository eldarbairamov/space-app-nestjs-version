import React from "react";

import { configuration } from "../../../config/configuration";
import { useAppSelector } from "../../../hook";

import user from "../../../asset/user.png";

import style from "./Dashboard-Avatar.module.scss";

export function DashboardAvatar() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardAvatar }>

         { avatar
            ?
            <div className={ style.avatar }><img src={ configuration.SERVER_URL + avatar } alt="avatar"/></div>
            :
            <img className={ style.no_avatar } src={ user } alt="no avatar"/>
         }

      </div>
   );
}
