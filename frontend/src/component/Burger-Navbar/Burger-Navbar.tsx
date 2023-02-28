import React from "react";

import { Dropdown, MenuProps, message } from "antd";
import { AppLogo } from "../Logo/App-Logo/App-Logo";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { AppRouter } from "../../router";
import { logoutService } from "../../service";
import { NavLink } from "react-router-dom";

import style from "./Burger-Navbar.module.scss";

export function BurgerNavbar() {
   const [ messageApi, contextHolder ] = message.useMessage();

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
               <MenuOutlined style={ { fontSize: "20px" } }/>
            </Dropdown>
            <LogoutOutlined onClick={ async () => logoutFn() } style={ { fontSize: "20px" } }/>
         </div>


      </div>
   );
}
