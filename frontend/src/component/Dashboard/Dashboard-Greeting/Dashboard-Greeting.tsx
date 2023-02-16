import React, { FC } from "react";

import { IUser } from "../../../interface";

import style from "./Dashboard-Greeting.module.scss";

interface IDashboardGreetingProps {
   userInfo: IUser;
}

export const DashboardGreeting: FC<IDashboardGreetingProps> = ({ userInfo }) => {
   return (
      <div className={ style.DashboardGreeting }>
         <span> Привіт, </span> { userInfo.username ? userInfo.username : "завантажую..." }
      </div>
   );
};
