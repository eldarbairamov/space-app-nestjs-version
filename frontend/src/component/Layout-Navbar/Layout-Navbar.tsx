import React from "react";

import { NavLink } from "react-router-dom";
import { message } from "antd";
import { AppLogo } from "../Logo/App-Logo/App-Logo";
import { LogoutOutlined } from "@ant-design/icons";
import { AppRouter } from "../../router";
import { logoutService } from "../../service";

import style from "./Layout-Navbar.module.scss";

export function LayoutNavbar() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { logoutFn } = logoutService(messageApi, () => AppRouter.navigate(0));

   return (
      <div className={ style.LayoutNavbar }>
         { contextHolder }

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
            <LogoutOutlined onClick={ async () => logoutFn() } style={ { fontSize: "23px" } }/>
         </div>

      </div>
   );
}
