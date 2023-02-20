import React from "react";

import { PlanHeader, PlanList } from "../../../component";
import { message } from "antd";
import { getPlansService } from "../../../service";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   getPlansService(messageApi);

   return (
      <div className={ style.PlansPage }>
         { contextHolder }

         {/* Header */ }
         <PlanHeader/>

         {/* Plan list wrapper */ }
         <div className={ style.plan_list_wrapper }>
            <PlanList/>
         </div>

      </div>
   );
}
