import { NavLink } from "react-router-dom";
import { AppLogo } from "@src/component";
import { UnauthorizedRouter } from "@src/router";
import { logoutService } from "@src/service";
import { useAppSelector } from "@src/hook";

import style from "./Layout-Navbar.module.scss";
import logoutDark from "/logout-dark.svg";
import logoutLight from "/logout-light.svg";

export function LayoutNavbar() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { logoutFn } = logoutService(() => UnauthorizedRouter.navigate("/login"))

   return (
      <div className={ style.LayoutNavbar }>

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
            <div className={ style.plans_link }>
               <NavLink className={ style.category } to={ "/plans" }> Плани </NavLink>
            </div>
            <div className={ style.moments_link }>
               <NavLink className={ style.category } to={ "/moments" }> Моменти </NavLink>
            </div>
         </div>

         {/* Logout  */ }
         <div className={ style.logout }>
            <img src={ isDark ? logoutLight : logoutDark } alt={ "logout" } style={ { width: "25px" } }
                 onClick={ () => logoutFn() }/>
         </div>

      </div>
   );
}
