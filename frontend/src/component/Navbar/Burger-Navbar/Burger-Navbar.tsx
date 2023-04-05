import { Dropdown, MenuProps } from "antd";
import { AppLogo } from "@src/component";
import { UnauthorizedRouter } from "@src/router";
import { logoutService } from "@src/service";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@src/hook";

import style from "./Burger-Navbar.module.scss";
import menuDark from "/menu-dark.svg";
import menuLight from "/menu-light.svg";
import logoutLight from "/logout-light.svg";
import logoutDark from "/logout-dark.svg";

export function BurgerNavbar() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { logoutFn } = logoutService(() => UnauthorizedRouter.navigate("/login"))

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
         <div className={ style.logo }>
            <AppLogo/>
         </div>

         <div className={ style.menu }>

            <Dropdown menu={ { items } }
                      placement="bottomRight"
                      trigger={ [ "click" ] }>
               <img src={ isDark ? menuLight : menuDark }
                    alt={ "menu" }
                    style={ { width: "25px" } }/>
            </Dropdown>

            <img src={ isDark ? logoutLight : logoutDark }
                 alt={ "logout" }
                 style={ { width: "20px" } }
                 onClick={ () => logoutFn() }/>

         </div>


      </div>
   );
}
