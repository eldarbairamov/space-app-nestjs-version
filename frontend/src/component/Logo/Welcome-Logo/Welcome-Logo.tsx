import React, { FC } from "react";

import style from "./Welcome-Logo.module.scss";

export const WelcomeLogo: FC = () => {
   return (
      <div className={ style.WelcomeLogo }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> в`ю </p>
         <p className={ style.third }> ] </p>
      </div>
   );
};
