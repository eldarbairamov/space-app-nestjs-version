import React from "react";

import { Divider } from "antd";
import { useAppSelector } from "../../../hook";

import style from "./Moment-Count.module.scss";

export function MomentCount() {
   const { momentsCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.MomentCount }>
         <Divider> <span>Моменти</span> </Divider>
         <p> { momentsCount } </p>
      </div>
   );
}
