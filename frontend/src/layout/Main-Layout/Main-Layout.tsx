import React from "react";

import { Outlet } from "react-router-dom";
import { LayoutNavbar } from "../../component";

import style from "./Main-Layout.module.scss";

export function MainLayout() {
   return (
      <div className={ style.MainLayout }>
         {/* Navbar */ }
         <LayoutNavbar/>

         {/* Body */ }
         <div className={ style.body }>
            <Outlet/>
         </div>

      </div>
   );
}