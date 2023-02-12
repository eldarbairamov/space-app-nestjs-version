import React, { FC, useEffect } from "react";

import { ResetPasswordForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Reset-Password-Page.module.scss";

export const ResetPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ResetPasswordPage }>


         {/* Toaster */ }
         <ToasterWithOptions/>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ResetPasswordForm/>

      </div>
   );
};
