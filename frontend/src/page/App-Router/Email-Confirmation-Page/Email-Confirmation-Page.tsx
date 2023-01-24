import React, { type FC } from "react";

import {
   EmailConfirmationMessage,
} from "../../../component";

import style from "./Email-Confirmation-Page.module.scss";
import { Toaster } from "react-hot-toast";

export const EmailConfirmationPage: FC = () => {

   return (
      <div className={ style.EmailConfirmationPage }>

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

         <EmailConfirmationMessage/>
      </div>
   );
};