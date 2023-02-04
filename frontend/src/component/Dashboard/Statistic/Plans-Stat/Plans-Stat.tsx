import React, { FC, useEffect, useState } from "react";

import { Divider } from "antd";
import { catchErrors } from "../../../../helper";
import { planService } from "../../../../services";

import style from "./Plans-Stat.module.scss";

export const PlansStat: FC = () => {
   const [ count, setCount ] = useState<number>();

   useEffect(() => {
      planService
         .getPlansCount()
         .then(res => setCount(res.data))
         .catch(e => catchErrors(e));
   }, []);

   return (
      <div className={ style.PlansStat }>
         <Divider> <span>Плани</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
