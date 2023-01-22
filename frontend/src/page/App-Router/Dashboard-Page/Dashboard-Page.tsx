import React, { type FC, useEffect } from "react";

import { GoalsStat, MomentsStat, NotesStat, ProfilePreview } from "../../../component";

import style from "./Dashboard-Page.module.scss";
import { asyncAuthActions } from "../../../redux/slice/auth.slice";
import { useAppDispatch } from "../../../hook/redux.hook";

export const DashboardPage: FC = () => {

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(asyncAuthActions.getUserInfo())
   }, []);

   return (
      <div className={ style.DashboardPage }>

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