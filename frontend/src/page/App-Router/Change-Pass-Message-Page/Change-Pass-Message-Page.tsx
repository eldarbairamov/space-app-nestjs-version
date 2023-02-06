import React, { FC } from "react";

import { ChangePasswordMessage } from "../../../component";

import style from "./Change-Pass-Message-Page.module.scss";

export const ChangePassMessagePage: FC = () => {

   return (
      <div className={ style.ChangePassMessagePage }>
         <ChangePasswordMessage/>
      </div>
   );
};