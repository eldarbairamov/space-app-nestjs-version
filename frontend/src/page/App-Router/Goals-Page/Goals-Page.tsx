import React, { type FC } from "react";

import style from "./Goals-Page.module.scss";
import { Toaster } from "react-hot-toast";

export const Goals: FC = () => {
   return (
      <div className={ style.GoalPage }>

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


      </div>
   );
};
