import React, { FC, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useMatchMedia } from "../../../hook";
import { ActivationForm, WelcomeLogo } from "../../../component";

import style from "./Activation-Page.module.scss";

export const ActivationPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ActivationPage }>

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

         <ActivationForm/>
      </div>
   );
};
