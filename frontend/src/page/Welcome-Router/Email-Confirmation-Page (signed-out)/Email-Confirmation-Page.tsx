import React, { type FC } from "react";

import { EmailConfirmationMessage } from "../../../component";

import style from "./Email-Confirmation-Page.module.scss";

export const EmailConfirmationPage: FC = () => {

   return (
      <div className={ style.EmailConfirmationPage }>
         <EmailConfirmationMessage/>
      </div>
   );
};