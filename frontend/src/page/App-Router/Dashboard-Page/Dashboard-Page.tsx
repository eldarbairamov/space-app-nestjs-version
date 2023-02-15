import React, { FC } from "react";

import { PlansStat, MomentsStat, NotesStat, ProfilePreview } from "../../../component";

import style from "./Dashboard-Page.module.scss";

export const DashboardPage: FC = () => {

   return (
      <div className={ style.DashboardPage }>

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