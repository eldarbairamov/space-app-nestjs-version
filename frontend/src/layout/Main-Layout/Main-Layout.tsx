import React, { FC } from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../../component";

import style from "./Main-Layout.module.scss";

export const MainLayout: FC = () => {

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