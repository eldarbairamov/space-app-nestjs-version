import React, { useState } from "react";

import * as dateHelper from "moment/moment";
import { IPlan } from "../../../interface";
import { updatePlanService } from "../../../service";
import { message } from "antd";
import { TypedOnChange } from "../../../interface/common.interface";

import style from "./Task-Header.module.scss";

interface ITaskHeaderProps {
   plan: IPlan;
}

export function TaskHeader({ plan }: ITaskHeaderProps) {
   const [ messageApi, contextHolder ] = message.useMessage();

   const [ planTitle, setPlanTitle ] = useState<string>(plan.title);

   const { updatePlanFn } = updatePlanService(messageApi);

   return (
      <div className={ style.TaskHeader }>
         { contextHolder }

         <input type={ "text" }
                className={ style.plan_title }
                id={ "planTitle" }
                value={ planTitle }
                onChange={ (event: TypedOnChange) => setPlanTitle(event.target.value) }
                onBlur={ () => updatePlanFn(plan.id, planTitle) }
         />
         <p className={ style.plan_date }> { dateHelper(plan.lastModified).format("DD-MM-YYYY  , HH:mm") } </p>
      </div>
   );
}
