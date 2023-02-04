import React, { type FC, useEffect } from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import toast, { Toaster } from "react-hot-toast";
import { useMatchMedia } from "../../../hook";

import style from "./Forgot-Password-Page.module.scss";

export const ForgotPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   useEffect(() => {
      toast.dismiss();
   }, []);

   return (
      <div className={ style.ForgotPasswordPage }>

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

         <ForgotPasswordForm/>
      </div>
   );
};
