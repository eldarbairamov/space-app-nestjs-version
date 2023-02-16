import React, { FC } from "react";

import { Divider } from "antd";

import style from "./Moment-Count.module.scss";

interface IMomentCountProps {
   momentsCount: number;
}

export const MomentCount: FC<IMomentCountProps> = ({ momentsCount }) => {

   return (
      <div className={ style.MomentCount }>
         <Divider> <span>Моменти</span> </Divider>
         <p> { momentsCount } </p>
      </div>
   );
};
