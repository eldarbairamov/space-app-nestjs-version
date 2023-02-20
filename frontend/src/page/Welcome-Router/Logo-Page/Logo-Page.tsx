import React, { useEffect } from "react";

import { WelcomeLogo } from "../../../component";
import { useLocation } from "react-router";
import { WelcomeRouter } from "../../../router";

import style from "./Logo-Page.module.scss";

export function LogoPage() {
   const location = useLocation();

   useEffect(() => {
      if (location.state && location.state.status === "unauthorized") WelcomeRouter.navigate("/unauthorized", { replace: true });
      if (location.state && location.state.status === "change password") WelcomeRouter.navigate("/login", { replace: true });
   }, []);

   return (
      <div className={ style.WelcomePage }>
         <WelcomeLogo/>
      </div>
   );
}
