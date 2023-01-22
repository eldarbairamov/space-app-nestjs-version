import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Moments-Stat.module.scss";

export const MomentsStat: FC = () => {
   return (
      <div className={ style.MomentsStat }>
         <Divider> <span>Моменти</span> </Divider>
         <p> 5 </p>
      </div>
   );
};
