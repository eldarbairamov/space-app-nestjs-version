import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Plans-Stat.module.scss";

export const PlansStat: FC = () => {
   return (
      <div className={ style.PlansStat }>
         <Divider> <span>Плани</span> </Divider>
         <p> 15 </p>
      </div>
   );
};
