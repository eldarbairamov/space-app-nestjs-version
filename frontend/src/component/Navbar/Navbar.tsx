import React, { type FC } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { AppLogo } from "../Logo/App-Logo/App-Logo";
import { LogoutOutlined } from "@ant-design/icons";
import { authService } from "../../services";
import toast, { Toaster } from "react-hot-toast";

import style from "./Navbar.module.scss";

export const Navbar: FC = () => {
   const navigate = useNavigate();

   const logOut = async () => {
      const loading = toast.loading("Зачекайте...");

      try {
         await authService.logout();

         navigate(0);

         toast.dismiss(loading);

      } catch (e) {
         toast.dismiss(loading);
      }
   };

   return (
      <div className={ style.Navbar }>
         <Toaster/>

         {/* LogoPage */ }
         <div className={ style.logo }>
            <AppLogo/>
         </div>

         {/* Navigation */ }
         <div className={ style.navigation }>
            <div className={ style.dashboard_link }>
               <NavLink to={ "/dashboard" }> Головна </NavLink>
            </div>
            <div className={ style.notes_link }>
               <NavLink className={ style.category } to={ "/notes" }> Замітки </NavLink>
            </div>
            <div className={ style.todo_link }>
               <NavLink className={ style.category } to={ "/plans" }> Плани </NavLink>
            </div>
            <div className={ style.moments_link }>
               <NavLink className={ style.category } to={ "/moments" }> Моменти </NavLink>
            </div>
         </div>

         {/* Profile bar  */ }
         <div className={ style.logout }>
            <LogoutOutlined onClick={ logOut } style={ { fontSize: "23px" } }/>
         </div>

      </div>
   );
};
