import React from "react";

import dateHelper from "moment/moment";
import { updatePlanService } from "../../../service";
import { message } from "antd";
import { TypedOnChange } from "../../../interface/common.interface";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { planAction } from "../../../redux/slice";
import { NoBgInput } from "../../UI/No-Bg-Input/No-Bg-Input";

import style from "./Task-Header.module.scss";

export function TaskHeader() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { activePlan } = useAppSelector(state => state.planReducer);

   const { updatePlanFn } = updatePlanService(messageApi);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.TaskHeader }>
         { contextHolder }

         { activePlan &&
            <>
               <NoBgInput type={ "text" }
                          style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                          id={ "title" }
                          value={ activePlan.title ? activePlan.title : "" }
                          onChange={ (event: TypedOnChange) => dispatch(planAction.updateTitle(event.target.value)) }
                          onBlur={ () => updatePlanFn(activePlan.id, activePlan.title) }/>
               <p className={ style.plan_date }> { dateHelper(activePlan.lastModified).format("DD-MM-YYYY  , HH:mm") } </p>
            </>
         }

      </div>
   );
}
