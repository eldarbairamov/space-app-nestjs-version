import React, { FC, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { WelcomeLogo } from "../../../component";
import { useLocation } from "react-router";

import style from "./Logo-Page.module.scss";

export const LogoPage: FC = () => {
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (location.state && location.state.status === "unauthorized") navigate("/unauthorized", { replace: true });
      if (location.state && location.state.status === "change password") navigate("/login", { replace: true });
   }, []);

   const enterToApp = () => {
      navigate("/registration");
   };

   return (
      <div className={ style.WelcomePage }>

         <div onClick={ enterToApp }>
            <WelcomeLogo/>
         </div>

      </div>
   );
};
