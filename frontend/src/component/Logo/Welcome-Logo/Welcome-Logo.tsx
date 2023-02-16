import React, { FC } from "react";

import { WelcomeRouter } from "../../../router";

import style from "./Welcome-Logo.module.scss";

export const WelcomeLogo: FC = () => {
   return (
      <div className={ style.WelcomeLogo } onClick={ () => WelcomeRouter.navigate("/registration") }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> в`ю </p>
         <p className={ style.third }> ] </p>
      </div>
   );
};