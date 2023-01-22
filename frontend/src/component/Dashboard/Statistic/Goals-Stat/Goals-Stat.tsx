import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Goals-Stat.module.scss";

export const GoalsStat: FC = () => {
   return (
      <div className={ style.GoalsStat }>
         <Divider> <span>Задачі</span> </Divider>
         <p> 15 / 6 </p>
      </div>
   );
};
