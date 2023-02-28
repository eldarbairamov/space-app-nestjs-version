import React from "react";

import { DashboardAvatar, DashboardEditProfile, DashboardGreeting, MomentCount, NoteCount, PlanCount } from "../../../component";
import { message } from "antd";
import { getUserService } from "../../../service";
import 'moment/locale/uk.js'

import style from "./Dashboard-Page.module.scss";

export function DashboardPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   getUserService(messageApi);

   return (
      <div className={ style.DashboardPage }>
         { contextHolder }

         <div className={ style.top }>
            <DashboardAvatar/>
            <DashboardGreeting/>
            <DashboardEditProfile/>
         </div>

         <div className={ style.bottom }>
            <NoteCount/>
            <PlanCount/>
            <MomentCount/>
         </div>

      </div>
   );
}