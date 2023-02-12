import React, { FC } from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Registration-Page.module.scss";

export const RegistrationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   return (
      <div className={ style.RegistrationPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <RegistrationForm/>

      </div>
   );
};
