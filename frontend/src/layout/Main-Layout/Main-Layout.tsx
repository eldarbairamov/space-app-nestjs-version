import React from "react";

import { Outlet } from "react-router-dom";
import { LayoutNavbar } from "../../component";
import { useMatchMedia } from "../../hook";

import style from "./Main-Layout.module.scss";
import { BurgerNavbar } from "../../component/Burger-Navbar/Burger-Navbar";

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