import React from "react";

import { Dropdown, MenuProps, message } from "antd";
import { AppLogo } from "../Logo/App-Logo/App-Logo";
import { AppRouter } from "../../router";
import { logoutService } from "../../service";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hook";

import style from "./Burger-Navbar.module.scss";
import menuDark from "../../asset/menu-dark.svg";
import menuLight from "../../asset/menu-light.svg";
import logoutLight from "../../asset/logout-light.svg";
import logoutDark from "../../asset/logout-dark.svg";

export function BurgerNavbar() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { isDark } = useAppSelector(state => state.appReducer);

   const { logoutFn } = logoutService(messageApi, () => {
      AppRouter.navigate("/");
      AppRouter.navigate(0);
   });

   const items: MenuProps["items"] = [
      {
         key: "1",
         label: (
            <NavLink to={ "/dashboard" }>
               Головна
            </NavLink>
         ),
      },
      {
         key: "2",
         label: (
            <NavLink to={ "/notes" }>
               Замітки
            </NavLink>
         ),
      },
      {
         key: "3",
         label: (
            <NavLink to={ "/plans" }>
               Плани
            </NavLink>
         ),
      },
      {
         key: "4",
         label: (
            <NavLink to={ "/moments" }>
               Моменти
            </NavLink>
         ),
      },
   ];

   return (
      <div className={ style.BurgerNavbar }>
         { contextHolder }

         {/* LogoPage */ }
         <div className={ style.logo }>
            <AppLogo/>
         </div>


         <div className={ style.menu }>
            <Dropdown menu={ { items } } placement="bottomRight" trigger={ [ "click" ] }>
               <img src={ isDark ? menuLight : menuDark } alt="as" style={ { width: "30px" } }/>
            </Dropdown>
            <img src={ isDark ? logoutLight : logoutDark } alt="logout" style={{width: "25px"}} onClick={ () => logoutFn() }/>
         </div>


      </div>
   );
}
