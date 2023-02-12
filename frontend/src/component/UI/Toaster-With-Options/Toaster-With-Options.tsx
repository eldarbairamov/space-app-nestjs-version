import React, { FC } from "react";
import { Toaster } from "react-hot-toast";

export const ToasterWithOptions: FC = () => {
   return (
      <div>
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
