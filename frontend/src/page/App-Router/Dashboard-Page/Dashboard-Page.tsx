import React, { type FC, useEffect } from "react";

import { GoalsStat, MomentsStat, NotesStat, ProfilePreview } from "../../../component";
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
         <div className={ style.top_side }>
            <ProfilePreview/>
         </div>

         {/* Bottom side */ }
         <div className={ style.bottom_side }>
            <NotesStat/>
            <GoalsStat/>
            <MomentsStat/>
         </div>

      </div>
   );
};