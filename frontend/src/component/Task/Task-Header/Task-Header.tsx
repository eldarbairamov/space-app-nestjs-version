import React, { FC } from "react";

import * as dateHelper from "moment/moment";
import { IPlan } from "../../../interface";
import { IInputFields } from "../../../page";
import { updatePlanService } from "../../../service";
import { message } from "antd";

import style from "./Task-Header.module.scss";

interface ITaskHeaderProps {
   plan: IPlan,
   inputFields: IInputFields
   onChangeFields(field: string, value: string): void
}

export const TaskHeader: FC<ITaskHeaderProps> = ({ inputFields, plan, onChangeFields }) => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { updatePlanFn } = updatePlanService(messageApi);

   return (
      <div className={ style.TaskHeader }>
         { contextHolder }

         <input type={ "text" }
                className={ style.plan_title }
                id={ "planTitle" }
                value={ inputFields.planTitle }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("planTitle", e.target.value) }
                onBlur={ () => updatePlanFn(plan.id, inputFields.planTitle) }
         />
         <p className={ style.plan_date }> { dateHelper(plan.lastModified).format("DD-MM-YYYY  , HH:mm") } </p>
      </div>
   );
};
