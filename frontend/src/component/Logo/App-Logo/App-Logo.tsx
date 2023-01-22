import React, { type FC } from "react";

import style from "./App-Logo.module.scss";

export const AppLogo: FC = () => {
   return (
      <div className={ style.AppLogo }>
         <p className={ style.first }> [ </p>
         <p className={ style.second }> в`ю </p>
         <p className={ style.third }> ] </p>
      </div>
   );
};
