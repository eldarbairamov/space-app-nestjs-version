import React, { type FC } from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook/use-match-media.hook";

import style from "./Registration-Page.module.scss";

export const RegistrationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   return (
      <div className={ style.RegistrationPage }>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <RegistrationForm/>

      </div>
   );
};
