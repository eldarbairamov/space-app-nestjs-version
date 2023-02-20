import React from "react";

import { WelcomeRouter } from "../../../router";

import style from "./Welcome-Logo.module.scss";

export function WelcomeLogo() {
   return (
      <div className={ style.WelcomeLogo } onClick={ () => WelcomeRouter.navigate("/registration") }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> спейс </p>
         <p className={ style.third }> ] </p>
      </div>
   );
}