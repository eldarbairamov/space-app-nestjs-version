import React, { type FC, useEffect } from "react";

import toast from "react-hot-toast";
import { useMatchMedia } from "../../../hook/use-match-media.hook";
import { ActivationForm, WelcomeLogo } from "../../../component";

import style from "./Activation-Page.module.scss";

export const ActivationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ActivationPage }>
         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <ActivationForm/>
      </div>
   );
};
