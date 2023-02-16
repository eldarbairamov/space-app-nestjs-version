import React, { FC } from "react";

import { config } from "../../../config/config";
import user from "../../../asset/user.png";
import { IUser } from "../../../interface";

import style from "./Dashboard-Avatar.module.scss";

interface IDashboardAvatarProps {
   userInfo: IUser;
}

export const DashboardAvatar: FC<IDashboardAvatarProps> = ({ userInfo }) => {
   return (
      <div className={ style.DashboardAvatar }>

         { userInfo.avatar &&
            <div className={ style.avatar }><img src={ config.SERVER_URL + userInfo.avatar } alt="avatar"/></div> }

         { !userInfo.avatar &&
            <img className={ style.no_avatar } src={ user } alt="no avatar"/> }

      </div>
   );
};
