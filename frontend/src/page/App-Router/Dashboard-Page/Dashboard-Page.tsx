import React, { FC } from "react";

import { DashboardAvatar, DashboardEditProfile, DashboardGreeting, MomentCount, NoteCount, PlanCount } from "../../../component";
import { message } from "antd";
import { getUserService } from "../../../service";

import style from "./Dashboard-Page.module.scss";

export const DashboardPage: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { userInfo } = getUserService(messageApi);

   return (
      <div className={ style.DashboardPage }>
         { contextHolder }

         <div className={ style.top }>
            <DashboardAvatar userInfo={ userInfo }/>
            <DashboardGreeting userInfo={ userInfo }/>
            <DashboardEditProfile/>
         </div>

         <div className={ style.bottom }>
            <NoteCount notesCount={ userInfo.notesCount }/>
            <PlanCount plansCount={ userInfo.plansCount }/>
            <MomentCount momentsCount={ userInfo.momentsCount }/>
         </div>

      </div>
   );
};