import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Plan-Count.module.scss";

interface IPlanCountProps {
   plansCount: number;
}

export const PlanCount: FC<IPlanCountProps> = ({ plansCount }) => {

   return (
      <div className={ style.PlanCount }>
         <Divider> <span>Плани</span> </Divider>
         <p> { plansCount } </p>
      </div>
   );
};
