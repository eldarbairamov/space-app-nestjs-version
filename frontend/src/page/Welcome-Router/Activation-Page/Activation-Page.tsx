import React, { FC } from "react";

import { useMatchMedia } from "../../../hook";
import { ActivationForm, WelcomeLogo } from "../../../component";

import style from "./Activation-Page.module.scss";

export const ActivationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   return (
      <div className={ style.ActivationPage }>

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ActivationForm/>

      </div>
   );
};
