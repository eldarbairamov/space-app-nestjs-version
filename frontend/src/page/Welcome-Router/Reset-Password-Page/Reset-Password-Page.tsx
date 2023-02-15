import React, { FC, useEffect } from "react";

import { ResetPasswordForm, WelcomeLogo } from "../../../component";
import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";

import style from "./Reset-Password-Page.module.scss";

export const ResetPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ResetPasswordPage }>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ResetPasswordForm/>

      </div>
   );
};
