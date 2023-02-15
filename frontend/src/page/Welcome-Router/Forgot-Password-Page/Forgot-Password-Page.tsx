import React, { FC, useEffect } from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";

import style from "./Forgot-Password-Page.module.scss";

export const ForgotPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ForgotPasswordPage }>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ForgotPasswordForm/>
      </div>
   );
};
