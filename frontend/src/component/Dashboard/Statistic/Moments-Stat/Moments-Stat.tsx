import React, { FC } from "react";

import { Divider } from "antd";
import { useAppSelector } from "../../../../hook";

import style from "./Moments-Stat.module.scss";

export const MomentsStat: FC = () => {
   const {momentsCount} = useAppSelector(state => state.userReducer)

   return (
      <div className={ style.MomentsStat }>
         <Divider> <span>Моменти</span> </Divider>
         <p> { momentsCount } </p>
      </div>
   );
};
