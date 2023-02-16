import React, { FC } from "react";

import { PlanHeader, PlanList } from "../../../component";
import { message } from "antd";
import { addPlanService, deletePlanService, getPlansService } from "../../../service";

import style from "./Plans-Page.module.scss";

export const PlansPage: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { plans, setPlans, setSearchKey, searchKey } = getPlansService(messageApi);
   const { addPlanFn } = addPlanService(setPlans, messageApi);
   const { deletePlanFn } = deletePlanService(plans, setPlans, messageApi);

   return (
      <div className={ style.PlansPage }>
         { contextHolder }

         {/* Header */ }
         <PlanHeader addPlanFn={ addPlanFn } setSearchKey={ setSearchKey } searchKey={ searchKey }/>

         {/* Plan list wrapper */ }
         <div className={ style.plan_list_wrapper }>
            <PlanList plans={ plans } deletePlanFn={ deletePlanFn }/>
         </div>

      </div>
   );
};
