import React, { FC } from "react";

import { PlansStat, MomentsStat, NotesStat, ProfilePreview } from "../../../component";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Dashboard-Page.module.scss";

export const DashboardPage: FC = () => {

   return (
      <div className={ style.DashboardPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         {/* Top */ }
         <div className={ style.top }>
            <ProfilePreview/>
         </div>

         {/* Bottom */ }
         <div className={ style.bottom }>
            <NotesStat/>
            <PlansStat/>
            <MomentsStat/>
         </div>

      </div>
   );
};