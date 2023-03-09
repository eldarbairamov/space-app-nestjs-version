import React from "react";

import { Outlet } from "react-router-dom";
import { LayoutNavbar, BurgerNavbar } from "@src/component";
import { useMatchMedia } from "@src/hook";

import style from "./Main-Layout.module.scss";

export function MainLayout() {
   const { isWidth1000 } = useMatchMedia();

   return (
      <div className={ style.MainLayout }>
         {/* Navbar */ }
         { !isWidth1000 ? <LayoutNavbar/> : <BurgerNavbar/> }

         {/* Body */ }
         <div className={ style.body }>
            <Outlet/>
         </div>

      </div>
   );
}