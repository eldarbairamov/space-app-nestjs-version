import React, { FC, useEffect } from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Forgot-Password-Page.module.scss";

export const ForgotPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ForgotPasswordPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ForgotPasswordForm/>
      </div>
   );
};
