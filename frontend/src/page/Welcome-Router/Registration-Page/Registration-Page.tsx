import React, { type FC } from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook/use-match-media.hook";

import style from "./Registration-Page.module.scss";
import { Toaster } from "react-hot-toast";

export const RegistrationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   return (
      <div className={ style.RegistrationPage }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         { isDesktop && <WelcomeLogo/> }
         { isTablet && <WelcomeLogo/> }

         <RegistrationForm/>

      </div>
   );
};
