import React, { FC } from "react";

import { Divider } from "antd";
import { useAppSelector } from "../../../../hook";

import style from "./Plans-Stat.module.scss";

export const PlansStat: FC = () => {
   const {plansCount} = useAppSelector(state => state.userReducer)

   return (
      <div className={ style.PlansStat }>
         <Divider> <span>Плани</span> </Divider>
         <p> { plansCount } </p>
      </div>
   );
};
