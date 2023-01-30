import React, { FC, useEffect, useState } from "react";

import { Divider } from "antd";

import style from "./Plans-Stat.module.scss";
import { planService } from "../../../../services";

export const PlansStat: FC = () => {
   const [ count, setCount ] = useState<number>();

   useEffect(() => {
      planService.getPlansCount().then(res => setCount(res.data));
   }, []);

   return (
      <div className={ style.PlansStat }>
         <Divider> <span>Плани</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
