import React, { FC, useEffect } from "react";

import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook";
import { ActivationForm, WelcomeLogo } from "../../../component";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Activation-Page.module.scss";

export const ActivationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ActivationPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ActivationForm/>
      </div>
   );
};
