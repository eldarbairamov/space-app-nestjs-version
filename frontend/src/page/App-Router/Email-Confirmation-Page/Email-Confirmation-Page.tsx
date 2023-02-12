import React, { FC } from "react";

import {
   EmailConfirmationMessage,
} from "../../../component";

import style from "./Email-Confirmation-Page.module.scss";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

export const EmailConfirmationPage: FC = () => {

   return (
      <div className={ style.EmailConfirmationPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         {/* Message */}
         <EmailConfirmationMessage/>
      </div>
   );
};