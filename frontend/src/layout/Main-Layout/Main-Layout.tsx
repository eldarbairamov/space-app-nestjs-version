import React, { type FC, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../../component";
import { asyncAuthActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";

import style from "./Main-Layout.module.scss";

export const MainLayout: FC = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(asyncAuthActions.getUserInfo());
   }, []);

   return (
      <div className={ style.MainLayout }>

         {/*Navbar*/ }
         <Navbar/>

         {/* Body */ }
         <div className={ style.body }>
            <Outlet/>
         </div>

      </div>
   );
};