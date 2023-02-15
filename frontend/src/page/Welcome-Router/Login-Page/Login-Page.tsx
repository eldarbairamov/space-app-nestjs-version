import React, { FC, useEffect } from "react";

import { LoginForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";

import style from "./Login-Page.module.scss";

export const LoginPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);


   return (
      <div className={ style.LoginPage }>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <LoginForm/>

      </div>
   );
};
