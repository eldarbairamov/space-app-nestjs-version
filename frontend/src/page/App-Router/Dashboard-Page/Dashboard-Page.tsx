import React, { FC } from "react";

import { PlansStat, MomentsStat, NotesStat, ProfilePreview } from "../../../component";
import { Toaster } from "react-hot-toast";

import style from "./Dashboard-Page.module.scss";

export const DashboardPage: FC = () => {

   return (
      <div className={ style.DashboardPage }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         {/* Top side */ }
         <div className={ style.top }>
            <ProfilePreview/>
         </div>

         {/* Bottom side */ }
         <div className={ style.bottom }>
            <NotesStat/>
            <PlansStat/>
            <MomentsStat/>
         </div>

      </div>
   );
};