import React, { FC, useEffect } from "react";

import { LoginForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Login-Page.module.scss";

export const LoginPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);


   return (
      <div className={ style.LoginPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <LoginForm/>

      </div>
   );
};
